import onChange from 'on-change';

const state = {
  appendProcess: {
    state: 'filling',
    successMsg: '',
    error: null,
    validationState: null,
  },
  uIState: { visited: {} },
  feeds: [],
  posts: [],
  modal: {
    title: '',
    body: '',
  },
};

const renderFeedback = (message, isInvalid) => {
  const feedback = document.querySelector('.feedback');
  if (isInvalid) {
    feedback.classList.add('text-danger');
    feedback.classList.remove('text-success');
  } else {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
  }
  feedback.textContent = message;
};

const renderRssForm = (formState, isInvalid) => {
  const input = document.getElementById('url-input');
  const btn = document.querySelector('.btn');
  input.disabled = formState === 'processing';
  btn.disabled = formState === 'processing';
  input.classList.remove('is-invalid');
  if (formState === 'processed') {
    if (isInvalid) {
      input.classList.add('is-invalid');
    } else {
      input.value = '';
      input.focus();
    }
  }
};
const handleAppendState = (value) => {
  if (value.state === 'processing' || value.state === 'filling') {
    renderFeedback('', false);
  }
  if (value.state === 'processed' && value.validationState === 'invalid') {
    renderFeedback(value.error, true);
  }
  if (value.state === 'failed') {
    renderFeedback(value.error, true);
  }
  if (value.state === 'processed' && value.validationState === 'valid') {
    renderFeedback(value.successMsg, false);
  }
  renderRssForm(value.state, value.validationState === 'invalid');
};
const buildSectionHeader = (header) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  card.innerHTML = `<div class="card-body"><h2 class="card-title h4">${header}</h2></div>`;
  return card;
};

const buildFeeds = (feeds) => {
  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  const listItems = feeds.map((feed) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'border-0');
    const itemTitle = document.createElement('h3');
    itemTitle.classList.add('h6', 'm-0');
    itemTitle.textContent = feed.title;
    const itemDescr = document.createElement('p');
    itemDescr.classList.add('m-0', 'small', 'text-black-50');
    itemDescr.textContent = feed.description;
    item.append(itemTitle, itemDescr);
    return item;
  });
  list.append(...listItems);
  return list;
};

const buildPostLink = (post, visited) => {
  const itemLink = document.createElement('a');
  if (visited[post.id]) {
    itemLink.classList.add('fw-normal', 'link-secondary');
  } else {
    itemLink.classList.add('fw-bold');
  }
  itemLink.target = '_black';
  itemLink.href = post.url;
  itemLink.dataset.id = post.id;
  itemLink.textContent = post.title;
  itemLink.onclick = () => {
    itemLink.classList.remove('fw-bold');
    itemLink.classList.add('fw-normal', 'link-secondary');
    visited[post.id] = true;
  };
  return itemLink;
};
const buildViewBtn = (postId) => {
  const itemButton = document.createElement('button');

  itemButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  itemButton.type = 'button';
  itemButton.dataset.bsToggle = 'modal';
  itemButton.dataset.bsTarget = '#postModal';
  itemButton.dataset.id = postId;
  itemButton.textContent = 'Просмотр';
  return itemButton;
};

const buildPosts = (posts, visited) => {
  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  const listItems = posts.map((post) => {
    const item = document.createElement('li');
    item.classList.add(
      'list-group-item',
      'border-0',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-end-0',
    );

    item.append(buildPostLink(post, visited), buildViewBtn(post.id));
    return item;
  });
  list.append(...listItems);

  return list;
};
const renderFeeds = (value) => {
  const feedsContainer = document.querySelector('.feeds');
  feedsContainer.innerHTML = '';
  feedsContainer.append(buildSectionHeader('Фиды'));
  feedsContainer.append(buildFeeds(value));
};
const renderPosts = (posts, visited) => {
  const postsContainer = document.querySelector('.posts');
  postsContainer.innerHTML = '';
  postsContainer.append(buildSectionHeader('Посты'));
  postsContainer.append(buildPosts(posts, visited));
};
const renderModal = (value) => {
  const modalTitle = document.querySelector('#postModalLabel');
  modalTitle.textContent = value.title;
  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = value.body;
  const modalFooter = document.querySelector('.modal-footer');
  const modalLink = modalFooter.querySelector('.btn-primary');
  modalLink.href = value.url;
  modalLink.target = '_blank';
};

const onStateChangeCallback = (watchedState, path, value) => {
  if (path === 'appendProcess') {
    handleAppendState(value);
  }
  if (path === 'feeds') {
    renderFeeds(value);
  }
  if (path === 'posts') {
    renderPosts(value, watchedState.uIState.visited);
  }
  if (path === 'modal') {
    renderModal(value);
  }
};

export default () => onChange(state, (path, value) => onStateChangeCallback(state, path, value));
