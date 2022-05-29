import "./styles.scss";
import i18next from "i18next";
import app from "./app/app.js";

const i18nextInstance = i18next.createInstance();

i18nextInstance
  .init({
    lng: "ru",
    debug: true,
    resources: {
      ru: {
        translation: {
          url_invalid: "Ссылка должна быть валидным URL",
          not_unique: "RSS уже существует"
        }
      }
    }
  })
  .then(() => {
    app(i18nextInstance);
  });
