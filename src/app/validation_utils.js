import { string, mixed, setLocale } from "yup";

setLocale({
  mixed: {
    notOneOf: ({ notOneOf }) => ({ key: "not_unique", values: { notOneOf } })
  },
  string: {
    url: ({ url }) => ({ key: "url_invalid", values: { url } }),
    min: ({ url }) => ({ key: "is_empty", values: { url } })
  }
});
export const isUrlValid = (url) => {
  const schema = string().url();
  return schema.validate(url);
};

export const isUrlUnique = (urls, newUrl) => {
  const schema = mixed().notOneOf(urls);
  return schema.validate(newUrl);
};
export const isNotEmpty = (url) => {
  const schema = string().min(1);
  return schema.validate(url);
};
