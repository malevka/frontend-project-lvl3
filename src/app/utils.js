import { string, mixed, setLocale } from "yup";
import i18next from "i18next";
i18next.init({
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
});

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    notOneOf: ({ notOneOf }) => ({ key: "not_unique", values: { notOneOf } })
  },
  // use functions to generate an error object that includes the value from the schema
  string: {
    url: ({ url }) => ({ key: "url_invalid", values: { url } })
  }
});
export const isUrlValid = (url) => {
  let schema = string().url();
  return schema.validate(url);
};

export const isUrlUnique = (urls, newUrl) => {
  let schema = mixed().notOneOf(urls);
  return schema.validate(newUrl);
};
