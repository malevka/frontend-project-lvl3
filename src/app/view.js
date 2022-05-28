import onChange from "on-change";

const state = {
  is_invalid: false,
  error: "",
  urls: []
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

export default () => onChange(state, (path, value) => {
  if (path === "is_invalid") {
    renderInput(value);
  }
  if (path === "error") {
    renderFeedback(value);
  }
  if (path === "urls") {
    renderInput(false);
  }
});
