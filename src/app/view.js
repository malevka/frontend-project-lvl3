import onChange from "on-change";

const state = {
  is_invalid: false,
  error: "",
  urls: []
};

const renderErrorFeedback = (msg) => {
  const feedback = document.querySelector(".feedback");
  feedback.classList.remove("text-success");
  feedback.classList.add("text-danger");
  feedback.textContent = msg;
};
const renderSuccesFeedback = (msg) => {
  const feedback = document.querySelector(".feedback");
  feedback.classList.add("text-success");
  feedback.classList.remove("text-danger");
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

export default () => onChange(state, (path, value) => {
  if (path === "is_invalid") {
    renderInput(value);
    renderErrorFeedback(state.feedback);
  }
  if (path === "urls") {
    renderInput(false);
    renderSuccesFeedback(state.feedback);
  }
});
