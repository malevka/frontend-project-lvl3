export default (content, feedId, initialId) => {
  const parser = new DOMParser();
  const rssDoc = parser.parseFromString(content, 'application/xml');
  const title = rssDoc.querySelector('title').textContent;
  const description = rssDoc.querySelector('description').textContent;
  const posts = [];
  const rssItems = rssDoc.querySelectorAll('item');
  rssItems.forEach((item) => {
    const post = {
      id: posts.length + initialId,
      feedId,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      url: item.querySelector('link').textContent,
    };
    posts.push(post);
  });
  return {
    feed: { id: feedId, title, description },
    posts,
  };
};
