import createState from "./view.js";
import { isUrlValid, isUrlUnique } from "./utils.js";
import loadRssData, { updatePosts } from "./proccess_rss.js";

export default (i18nextIns) => {
  const addRss = (state, url) => {
    const localState = state;
    localState.appendProcess = { state: "processing", message: "" };
    isUrlValid(url)
      .then(() => {
        const urls = state.feeds.map((feed) => feed.url);
        return isUrlUnique(urls, url);
      })
      .then(() => loadRssData(state, url, i18nextIns))
      .catch((err) => {
        localState.appendProcess = { state: "failed", message: i18nextIns.t(err.errors[0].key) };
      });
  };
  const state = createState();
  const rssForm = document.querySelector(".rss-form");
  const postModal = document.getElementById("postModal");
  postModal.addEventListener("show.bs.modal", (event) => {
    const postId = Number(event.relatedTarget.dataset.id);
    const post = state.posts.find(({ id }) => id === postId);
    post.visited = true;
    state.modal = { title: post.title, body: post.description, url: post.url };
    state.posts = [...state.posts];
  });

  rssForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("url-input");
    const url = input.value.trim();
    addRss(state, url);
  });
  updatePosts(state);
};
