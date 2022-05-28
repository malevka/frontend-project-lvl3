import { createState } from "./view.js";
import { isUrlValid, isUrlUnique } from "./utils.js";
import i18next from "i18next";

const addUrl = (state, url) => {
  isUrlValid(url)
    .then(() => isUrlUnique(state.urls, url))
    .then(() => {
      state.is_invalid = false;
      state.error = "";
      state.urls.push(url);
    })
    .catch((err) => {
      const msg = i18next.t(err.errors[0].key);
      state.is_invalid = true;
      state.error = msg;
    });
};

export default () => {
  const state = createState();
  const rssForm = document.querySelector(".rss-form");

  rssForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("url-input");
    const url = input.value;
    addUrl(state, url);
  });
};
