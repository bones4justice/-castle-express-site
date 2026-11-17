// Homepage design version. The Nov 2026 redesign (photo hero, white estimate
// card) is a DESIGN change, separate from the hero_ab_test copy experiment.
// It rides along on the hero_ab_test exposure event, homepage leads (GA4
// generate_lead / form_submission_success + Formspree) and hero phone taps,
// so results collected under the old and new designs stay distinguishable.
// The old design never sent this field: no home_design = the old design.
export const HOME_DESIGN = "v2-2026-11";
