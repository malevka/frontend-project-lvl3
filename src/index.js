import "./styles.scss";
import i18next from "i18next";
import app from "./app/app.js";
import "bootstrap";

const i18nextInstance = i18next.createInstance();

i18nextInstance
  .init({
    lng: "ru",
    resources: {
      ru: {
        translation: {
          url_invalid: "Ссылка должна быть валидным URL",
          not_unique: "RSS уже существует",
          success: "RSS успешно загружен",
          rss_invalid: "Ресурс не содержит валидный RSS"
        }
      }
    }
  })
  .then(() => {
    app(i18nextInstance);
  });
