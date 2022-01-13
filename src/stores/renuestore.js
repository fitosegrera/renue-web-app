import { readable, writable } from "svelte/store";

const repoUrl = "https://renue-web-app.prismic.io/api/v2";

export const cms_url = readable(repoUrl);
export const navbar_data = writable({});
export const footer_data = writable({});

/*
const fetchRefs = async () => {
  const res = await fetch(repoUrl);
  const data = await res.json();
  return data.refs;
};

const fetchData = async (callback) => {
  const refs = await fetchRefs();

  const masterRef = await refs.map((ref, index) => {
    return ref.ref;
  });

  const url = repoUrl + "/documents/search?ref=" + masterRef + "#format=json";
  const res = await fetch(url);
  const data = await res.json();

  let navBarData = {};
  let footerData = {};

  await data.results.map((data, index) => {
    if (data.slugs[0] === "navbar") {
      navBarData = data.data;
    }
    if (data.slugs[0] === "footer") {
      footerData = data.data;
    }
  });

  callback(navBarData, footerData);
};

fetchData((navbar, footer) => {
  // console.log("navbar", navbar);
  // console.log("footer", footer);
  navbar_data.set(navbar);
  footer_data.set(footer);
});
*/
