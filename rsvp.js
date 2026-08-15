const form = document.getElementById("rsvpForm");
const attendance = document.getElementById("attendance");
const guests = document.getElementById("guests");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

attendance.addEventListener("change", () => {
  if (attendance.value === "no") {
    guests.value = "1";
    guests.disabled = true;
  } else {
    guests.disabled = false;
  }
});

form.addEventListener("submit", () => {
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
});


/* =================================
   BACK TO PREVIOUS PAGE
   ================================= */

const backButton = document.getElementById("backButton");

if (backButton) {
  backButton.addEventListener("click", function () {

    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }

  });
}