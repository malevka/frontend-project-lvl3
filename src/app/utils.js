import { string, mixed } from "yup";

export const isUrlValid = (url) => {
  let schema = string().url();
  return schema
    .isValid(url)
    .then((result) => (result ? Promise.resolve() : Promise.reject("Ссылка должна быть валидным URL")));
};

export const isUrlUnique = (urls, newUrl) => {
  let schema = mixed().notOneOf(urls);
  return schema.isValid(newUrl).then((result) => (result ? Promise.resolve() : Promise.reject("RSS уже существует")));
};
