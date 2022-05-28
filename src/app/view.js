import onChange from "on-change";

const state = {
  is_invalid: false,
  error: "",
  urls: []
};
export const createState = () => {
  return onChange(state, function (path, value, previousValue, applyData) {
    if (path === "is_invalid") {
      renderInput(value);
    }
    if (path === "error") {
      renderFeedback(value);
    }
    console.log();
    if (path === "urls") {
      renderInput(false);
    }
  });
};

const renderFeedback = (msg) => {
  const feedback = document.querySelector(".feedback");
  feedback.textContent = msg;
};
const renderInput = (isInvalid) => {
  const input = document.getElementById("url-input");
  if (isInvalid) {
    input.classList.add("is-invalid");
  } else {
    input.classList.remove("is-invalid");
    input.value = "";
    input.focus();
  }
};
