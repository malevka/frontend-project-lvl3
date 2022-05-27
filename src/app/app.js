import { createState, renderFeedback, renderInputInvalid, clearAlert } from "./view.js";
import { isUrlValid, isUrlUnique } from "./utils.js";
export default () => {
  const state = createState();
  const rssForm = document.querySelector(".rss-form");

  rssForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("url-input");
    const url = input.value;
    clearAlert();
    isUrlValid(url)
      .then(() => isUrlUnique(state.urls, url))
      .then(() => state.urls.push(url))
      .catch((msg) => {
        renderInputInvalid();
        renderFeedback(msg);
      });
  });
};
