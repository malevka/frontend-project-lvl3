import axios from "axios";

const proxy = "https://allorigins.hexlet.app/get?disableCache=true&url=";
export default (url) => axios.get(`${proxy}${url}`)
  .then((result) => (result.data.status.http_code !== 200
    ? Promise.reject() : result.data.contents));
