import onChange from "on-change";

const state = {
  urls: []
};
export const createState = () => {
  return onChange(state, function (path, value, previousValue, applyData) {
    console.log("this:", this);
    console.log("path:", path);
    console.log("value:", value);
    console.log("previousValue:", previousValue);
    console.log("applyData:", applyData);
  });
};

export const renderFeedback = (msg) => {
  const feedback = document.querySelector(".feedback");
  feedback.textContent = msg;
};
export const renderInputInvalid = () => {
  const input = document.getElementById("url-input");
  input.classList.add("is-invalid");
};

export const clearAlert = () => {
  const input = document.getElementById("url-input");
  input.classList.remove("is-invalid");
  renderFeedback("");
};
