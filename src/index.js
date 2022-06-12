import './styles.scss';
import i18next from 'i18next';
import app from './app/app.js';
import 'bootstrap/js/dist/modal.js';

const i18nextInstance = i18next.createInstance();

i18nextInstance
  .init({
    lng: 'ru',
    resources: {
      ru: {
        translation: {
          url_invalid: 'Ссылка должна быть валидным URL',
          not_unique: 'RSS уже существует',
          success: 'RSS успешно загружен',
          invalid_content: 'Ресурс не содержит валидный RSS',
          network_failure: 'Ошибка сети',
          is_empty: 'Не должно быть пустым',
        },
      },
    },
  })
  .then(() => {
    app(i18nextInstance);
  });
