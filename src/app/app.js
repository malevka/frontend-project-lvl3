import createState from "./view.js";
import { isUrlValid, isUrlUnique } from "./utils.js";
import propcessRss, { updatePosts } from "./proccess_rss.js";

export default (i18nextIns) => {
  const addRss = (state, url) => {
    const localState = state;
    localState.appendProcess = { state: "processing", message: "" };
    isUrlValid(url)
      .then(() => {
        const urls = state.feeds.map(({ feedUrl }) => feedUrl);
        return isUrlUnique(urls, url);
      })
      .then(() => propcessRss(state, url, i18nextIns))
      /* .then(() => {
        localState.appendProcess = { state: "success", message: i18nextIns.t("success") };
        localState.urls.push(url);
      }) */
      .catch((err) => {
        localState.appendProcess = { state: "failed", message: i18nextIns.t(err.errors[0].key) };
      });
  };
  const state = createState();
  const rssForm = document.querySelector(".rss-form");

  rssForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("url-input");
    const url = input.value.trim();
    addRss(state, url);
  });
  updatePosts(state);
};
