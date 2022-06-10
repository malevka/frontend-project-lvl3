import axios from "axios";

const proxy = "https://allorigins.hexlet.app/get?disableCache=true&url=";
export default (url) => axios.get(`${proxy}${encodeURIComponent(url)}`).then((result) => result.data.contents);
