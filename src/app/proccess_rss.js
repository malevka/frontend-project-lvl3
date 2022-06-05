import getRssContent from "./api.js";

const parseRss = (content, feedId) => {
  const parser = new DOMParser();
  const rssDoc = parser.parseFromString(content, "application/xml");
  const title = rssDoc.querySelector("title").textContent;
  const description = rssDoc.querySelector("description").textContent;
  const posts = [];
  const rssItems = rssDoc.querySelectorAll("item");
  rssItems.forEach((item) => {
    const post = {
      id: posts.length,
      feedId,
      title: item.querySelector("title").textContent,
      url: item.querySelector("link").textContent
    };
    posts.push(post);
  });
  return {
    feed: { id: feedId, title, description },
    posts
  };
};
export default (state, url, i18nextIns) => {
  const localState = state;
  getRssContent(url)
    .then((content) => parseRss(content, state.feeds.length))
    .then((result) => {
      localState.feeds.push({ url, ...result.feed });
      localState.posts.push(...result.posts);
      localState.appendProcess = { state: "success", message: i18nextIns.t("success") };
    })
    .catch(() => {
      localState.appendProcess = { state: "rss_invalid", message: i18nextIns.t("rss_invalid") };
    });
};
