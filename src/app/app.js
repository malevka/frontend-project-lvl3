import i18next from "i18next";
import createState from "./view";
import { isUrlValid, isUrlUnique } from "./utils";

const addUrl = (state, url) => {
  const localState = state;
  isUrlValid(url)
    .then(() => isUrlUnique(state.urls, url))
    .then(() => {
      localState.is_invalid = false;
      localState.error = "";
      localState.urls.push(url);
    })
    .catch((err) => {
      const msg = i18next.t(err.errors[0].key);
      localState.is_invalid = true;
      localState.error = msg;
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
