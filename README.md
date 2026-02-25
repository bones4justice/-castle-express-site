# Castle Express Moving & Storage - Website

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
```

## Deploy to Vercel (Free)

### First-Time Setup

1. **Create a GitHub account** (if you don't have one): https://github.com
2. **Create a new repository**:
   - Go to https://github.com/new
   - Name it `castle-express-site`
   - Set to Private
   - Click "Create repository"

3. **Push this code to GitHub**:
   ```bash
   cd castle-site
   git init
   git add .
   git commit -m "Initial site build"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/castle-express-site.git
   git push -u origin main
   ```

4. **Connect to Vercel**:
   - Go to https://vercel.com and sign up with your GitHub account
   - Click "New Project"
   - Import your `castle-express-site` repository
   - Click "Deploy" (default settings work fine)
   - Your site is now live at a `.vercel.app` URL

5. **Connect your domain**:
   - In Vercel, go to your project → Settings → Domains
   - Add `castleexpressmovingandstorage.com`
   - Vercel will give you DNS records to add at your domain registrar
   - Point your domain's nameservers to Vercel, OR add the A/CNAME records they provide
   - SSL is automatic

### Making Updates

After the initial setup, updating the site is simple:

```bash
# Edit any file (e.g., content.js to change text)
# Then:
git add .
git commit -m "Updated phone number" 
git push
```

Vercel automatically detects the push and redeploys in ~30 seconds.

---

## Project Structure

```
castle-site/
├── app/                    # Pages (file-based routing)
│   ├── layout.js           # Root layout (header, footer, fonts, SEO)
│   ├── page.js             # Homepage
│   ├── globals.css          # Global styles
│   ├── about/page.js       # /about
│   ├── services/page.js    # /services
│   ├── service-areas/page.js  # /service-areas
│   ├── contact/page.js     # /contact
│   └── referral/page.js    # /referral
├── components/             # Reusable components
│   ├── Header.js           # Navigation header
│   ├── Footer.js           # Site footer
│   ├── EstimateForm.js     # Lead capture form
│   └── Icons.js            # SVG icons
├── content.js              # ⭐ ALL SITE TEXT LIVES HERE
├── package.json
├── next.config.js
└── README.md
```

## How to Edit the Site

### Change text, phone numbers, company info
Edit `content.js`. This single file contains ALL text displayed on the site:
- Company name, phone, address, hours
- Service descriptions and features
- Service area lists
- Customer reviews
- FAQ questions and answers
- About page copy
- Form field options (move sizes, lead sources)

### Change colors or fonts
Edit `app/globals.css` — all brand tokens are CSS variables at the top.

### Change page layout or sections
Edit the relevant file in `app/`. Each page is a single file.

### Add a new page
Create a new folder in `app/` with a `page.js` file:
```
app/new-page/page.js  →  yoursite.com/new-page
```

---

## Form Backend (TODO)

The estimate form currently simulates submission. To make it actually send leads:

### Option 1: Formspree (easiest, free tier: 50/month)
1. Go to https://formspree.io and create a form
2. In `components/EstimateForm.js`, replace the simulated submission with:
```javascript
await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### Option 2: Your own API (on your EC2 server)
Send form data to your existing infrastructure:
```javascript
await fetch("https://your-api.castleexpressmoving.com/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### Option 3: Email via Resend (recommended for production)
1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Create an API route at `app/api/estimate/route.js`
3. Send email notifications on each form submission

---

## Future Migration to castleexpressmoving.com

When ready to swap from staging to production:

1. In Vercel, add `castleexpressmoving.com` as a domain
2. Update DNS at your domain registrar (Bluehost) to point to Vercel
3. Set up 301 redirects from old WordPress URLs to new pages
4. Update Google Business Profile, BBB, and ad campaigns
5. Cancel Bluehost hosting (or keep for email if applicable)

## Tech Stack
- **Framework**: Next.js 14 (React)
- **Hosting**: Vercel (free tier is plenty)
- **Fonts**: Google Fonts (Nunito + Merriweather)
- **Styling**: CSS (no Tailwind dependency needed)
- **No database required**
