/* @preserve SW Version: 1.0.1 */
// Define the imp since it's for horoscope, and pass along any other
// data in the querysting. the SW.js will pick out what it needs.
const queryParams = new URLSearchParams(location.search);
const impParam = queryParams.get("imp");
const swUrl = "//m.pushible.com/js/serviceworker";
// Legacy Support: If Prompt doesn't pass imp through on registration
// we need to supplement for it.
const imp = "horoscope_microsite";
const queryString = location.search.substring(1);
const importUrl = impParam
  ? `${swUrl}?${queryString}`
  : `${swUrl}?imp=${imp}&${queryString}`;

importScripts(importUrl);
