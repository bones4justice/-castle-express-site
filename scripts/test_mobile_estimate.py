"""Run against a local next start with Python Playwright installed.

ESTIMATE_TEST_URL=http://127.0.0.1:3000 python3 scripts/test_mobile_estimate.py
Set ESTIMATE_BROWSER=webkit to repeat with mobile WebKit.
"""
import os
import unittest
from urllib.parse import urlencode, urlsplit

from playwright.sync_api import expect, sync_playwright


class MobileEstimateTest(unittest.TestCase):
    def test_estimate_minimum_time(self):
        base = os.getenv("ESTIMATE_TEST_URL", "http://127.0.0.1:3000")
        with sync_playwright() as pw:
            api = pw.request.new_context(base_url=base)
            # An incomplete phone stops the request before any provider writes.
            body = {"form": "estimate", "smartmoving": {"FullName": "Taylor Morgan", "PhoneNumber": "123"}}
            fast = api.post("/api/lead/", data={**body, "elapsedMs": 7999})
            self.assertEqual(fast.status, 200)
            self.assertEqual(fast.json(), {"ok": True, "s": 1})
            eligible = api.post("/api/lead/", data={**body, "elapsedMs": 8000})
            self.assertEqual(eligible.status, 400)
            self.assertIn("phone", eligible.json()["error"])
            api.dispose()

    def test_five_steps(self):
        base = os.getenv("ESTIMATE_TEST_URL", "http://127.0.0.1:3000")
        tags = dict(utm_source="google", utm_medium="cpc", utm_campaign="mobile-test",
                    gclid="test-g", gbraid="test-gb", wbraid="test-wb", fbclid="test-f")
        with sync_playwright() as pw:
            browser = getattr(pw, os.getenv("ESTIMATE_BROWSER", "chromium")).launch()
            for path in ["/", "/get-estimate/"]:
                with self.subTest(path=path):
                    context = browser.new_context(viewport={"width": 375, "height": 812},
                                                  is_mobile=True, has_touch=True)
                    page = context.new_page()
                    # Exercise the form and its real analytics calls locally.
                    # Only the lead response is simulated. No customer record is created.
                    pending = []
                    def route_request(route):
                        url = urlsplit(route.request.url)
                        if url.path.rstrip("/") == "/api/lead":
                            pending.append(route)
                        elif url.netloc != urlsplit(base).netloc:
                            route.abort()
                        else:
                            route.continue_()

                    page.route("**/*", route_request)
                    page.goto(base + path + "?" + urlencode(tags) + "&ge_ab=form")
                    if path == "/":
                        badge = page.get_by_role("link", name="Read our Google reviews", exact=True)
                        expect(badge).to_have_attribute("href", "/reviews/")
                        badge.tap()
                        expect(page).to_have_url(base + "/reviews/")
                        page.go_back()
                    for text in ["Local", "House", "2 BR"]:
                        page.get_by_role("button", name=text, exact=True).tap()
                    origin = page.get_by_label("Moving from", exact=True)
                    destination = page.get_by_label("Moving to", exact=True)
                    expect(origin).to_have_value("")
                    expect(page.get_by_role("button", name="Continue")).to_be_disabled()
                    origin.tap()
                    # Reduce the visible height while typing, as with a soft keyboard.
                    page.set_viewport_size({"width": 375, "height": 495})
                    for char in "Enf":
                        page.keyboard.type(char)
                        expect(origin).to_be_focused()
                    page.get_by_role("button", name="Enfield, CT").tap()
                    expect(origin).to_be_focused()
                    expect(origin).to_have_value("Enfield, CT")
                    origin.press("Enter")
                    expect(destination).to_be_focused()
                    destination.press_sequentially("Hartford")
                    expect(destination).to_be_focused()
                    page.get_by_role("button", name="Continue").tap()
                    page.set_viewport_size({"width": 375, "height": 812})
                    submit = page.get_by_role("button", name="Get My Free Estimate", exact=True)
                    name = page.get_by_role("textbox", name="Your name")
                    phone = page.get_by_role("textbox", name="Phone number")
                    submit.tap()
                    expect(name).to_be_focused()
                    expect(page.locator("form.isf-step-contact").get_by_role("alert")).to_have_text("Please enter your name.")
                    name.fill("Taylor Morgan")
                    submit.tap()
                    expect(phone).to_be_focused()
                    phone.fill("8605550123")
                    page.get_by_role("button", name="ASAP").tap()
                    page.evaluate("window.testEvents = []; window.gtag = (...args) => window.testEvents.push(args)")
                    submit.tap()
                    sending = page.get_by_role("button", name="Sending...")
                    expect(sending).to_be_disabled()
                    expect(sending.locator(".isf-spinner")).to_be_visible()
                    page.locator("form.isf-step-contact").evaluate("(form) => form.requestSubmit()")
                    self.assertEqual(len(pending), 1)
                    body = pending[0].request.post_data_json
                    self.assertGreater(body["renderedAt"], 0)
                    self.assertEqual(body["hp"], "")
                    self.assertEqual(body["smartmoving"]["OriginAddressFull"], "Enfield, CT")
                    self.assertEqual(body["smartmoving"]["DestinationAddressFull"], "Hartford")
                    for key, value in tags.items():
                        self.assertEqual(body["formspree"][key], value)
                    pending[0].fulfill(json={"ok": True})
                    expect(page.get_by_role("heading", name="Thanks, Taylor!")).to_be_visible()
                    self.assertEqual(page.evaluate("testEvents.filter(e => e[1] === 'generate_lead').length"), 1)
                    self.assertEqual(len(pending), 1)
                    context.close()
            browser.close()


if __name__ == "__main__":
    unittest.main()
