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
      id: item.querySelector("guid").textContent,
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
      localState.posts.unshift(...result.posts);
      localState.appendProcess = { state: "success", message: i18nextIns.t("success") };
    })
    .catch(() => {
      localState.appendProcess = { state: "rss_invalid", message: i18nextIns.t("rss_invalid") };
    });
};

export const updatePosts = (state) => {
  const localState = state;
  const promises = [];
  localState.feeds.forEach(({ url, id }) => {
    const promise = getRssContent(url)
      .then((content) => parseRss(content, id))
      .then((result) => {
        const existingPosts = localState.posts.reduce((arr, post) => {
          if (post.feedId === id) {
            arr.push(post.id);
          }
          return arr;
        }, []);
        const newPosts = result.posts.filter((post) => !existingPosts.includes(post.id));
        localState.posts.unshift(...newPosts);
        return Promise.resolve;
      });
    promises.push(promise);
  });
  Promise.all(promises).then(() => setTimeout(() => updatePosts(localState), 5000));
};
