const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll("[data-toggle]");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const key = toggle.getAttribute("data-toggle");
      const body = document.getElementById(`${key}-body`);
      const chevron = toggle.querySelector(".chevron");
      const isHidden = body.hasAttribute("hidden");

      if (isHidden) {
        body.removeAttribute("hidden");
        chevron.classList.add("expanded");
        toggle.classList.add("expanded");
      } else {
        body.setAttribute("hidden", "");
        chevron.classList.remove("expanded");
        toggle.classList.remove("expanded");
      }
    });
  });

  const signInButton = document.getElementById("sign-in-button");
  const loginOverlay = document.getElementById("login-overlay");
  const loginModalClose = document.getElementById("login-modal-close");

  signInButton.addEventListener("click", () => {
    loginOverlay.removeAttribute("hidden");
  });

  loginModalClose.addEventListener("click", () => {
    loginOverlay.setAttribute("hidden", "");
  });

  loginOverlay.addEventListener("click", (event) => {
    if (event.target === loginOverlay) {
      loginOverlay.setAttribute("hidden", "");
    }
  });

  const input = document.getElementById("composer-input");
  const form = document.getElementById("composer-form");

  document.querySelectorAll(".preset-button").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = button.getAttribute("data-preset");
      input.focus();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!input.value.trim()) return;
    // Placeholder until this is wired to the backend.
    console.log("Submitted query:", input.value);
    input.value = "";
  });
});
