import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showJobs } from "./jobs.js";

let registerDiv = null;
let name = null;
let email1 = null;
let password1 = null;
let password2 = null;

export const handleRegister = () => {
  registerDiv = document.getElementById("register-div");
  name = document.getElementById("name");
  email1 = document.getElementById("email1");
  password1 = document.getElementById("password1");
  password2 = document.getElementById("password2");
  const registerButton = document.getElementById("register-button");
  const registerCancel = document.getElementById("register-cancel");

  registerDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === registerButton) {
        // Registration logic
        if (!name.value || !email1.value || !password1.value || !password2.value) {
          message.textContent = "Please fill in all fields.";
          return;
        }
        if (password1.value !== password2.value) {
          message.textContent = "Passwords do not match.";
          return;
        }
        enableInput(false);
        try {
          const response = await fetch("/api/v1/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name.value,
              email: email1.value,
              password: password1.value,
            }),
          });
          const data = await response.json();
          if (response.status === 201) {
            setToken(data.token);
            message.textContent = "Registration successful!";
            showJobs();
          } else {
            message.textContent = data.msg || "Registration failed.";
          }
        } catch (err) {
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      } else if (e.target === registerCancel) {
        showLoginRegister();
      }
    }
  });
};

export const showRegister = () => {
  email1.value = null;
  password1.value = null;
  password2.value = null;
  setDiv(registerDiv);
};