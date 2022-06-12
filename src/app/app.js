import createState from './view.js';
import { isUrlValid, isUrlUnique, isNotEmpty } from './validation_utils.js';
import parseRss from './parse.js';
import getRssContent from './api.js';

export default (i18nextIns) => {
  const state = createState();
  const rssForm = document.querySelector('.rss-form');
  const postModal = document.getElementById('postModal');
  postModal.addEventListener('show.bs.modal', (event) => {
    const postId = Number(event.relatedTarget.dataset.id);
    const post = state.posts.find(({ id }) => id === postId);
    state.uIState.visited[postId] = true;
    state.modal = { title: post.title, body: post.description, url: post.url };
    state.posts = [...state.posts];
  });

  rssForm.addEventListener('input', (e) => {
    const url = e.target.value;
    state.appendProcess = { ...state.appendProces, state: 'filling' };
    isNotEmpty(url).catch((err) => {
      state.appendProcess = {
        state: 'processed',
        error: i18nextIns.t(err.errors[0].key),
        validationState: 'invalid',
      };
    });
  });
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('url-input');
    const url = input.value.trim();
    isUrlValid(url)
      .then(() => {
        const urls = state.feeds.map((feed) => feed.url);
        return isUrlUnique(urls, url);
      })
      .catch((err) => {
        state.appendProcess = {
          state: 'processed',
          error: i18nextIns.t(err.errors[0].key),
          validationState: 'invalid',
        };
        throw err;
      })
      .then(() => {
        state.appendProcess = {
          state: 'processing',
          validationState: 'valid',
        };
        return getRssContent(url).catch((err) => {
          state.appendProcess = {
            ...state.appendProcess,
            state: 'failed',
            error: i18nextIns.t('network_failure'),
          };
          throw err;
        });
      })
      .then((content) => {
        try {
          return parseRss(content, state.feeds.length, state.posts.length);
        } catch (err) {
          state.appendProcess = {
            ...state.appendProcess,
            state: 'failed',
            error: i18nextIns.t('invalid_content'),
          };
          throw err;
        }
      })
      .then((result) => {
        state.feeds.push({ url, ...result.feed });
        state.posts.unshift(...result.posts);
        state.appendProcess = {
          ...state.appendProcess,
          state: 'processed',
          successMsg: i18nextIns.t('success'),
          error: '',
        };
      })
      .catch();
  });
  const updatePosts = () => {
    const promises = [];
    state.feeds.forEach(({ url, id }) => {
      const promise = getRssContent(url)
        .then((content) => parseRss(content, id, state.posts.length))
        .then((result) => {
          const existingPosts = state.posts.reduce((arr, post) => {
            if (post.feedId === id) {
              arr.push(post.url);
            }
            return arr;
          }, []);
          const newPosts = result.posts.filter((post) => !existingPosts.includes(post.url));
          state.posts.unshift(...newPosts);
          return Promise.resolve;
        });
      promises.push(promise);
    });
    Promise.all(promises).then(() => setTimeout(() => updatePosts(), 5000));
  };
  updatePosts();
};
