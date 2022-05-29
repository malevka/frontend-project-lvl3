import createState from "./view.js";
import { isUrlValid, isUrlUnique } from "./utils.js";

export default (i18nextIns) => {
  const addUrl = (state, url) => {
    const localState = state;
    isUrlValid(url)
      .then(() => isUrlUnique(state.urls, url))
      .then(() => {
        localState.is_invalid = false;
        localState.feedback = "RSS успешно загружен";
        localState.urls.push(url);
      })
      .catch((err) => {
        const msg = i18nextIns.t(err.errors[0].key);
        localState.is_invalid = true;
        localState.feedback = msg;
      });
  };
  const state = createState();
  const rssForm = document.querySelector(".rss-form");

  rssForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("url-input");
    const url = input.value;
    addUrl(state, url);
  });
};
