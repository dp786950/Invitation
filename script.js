const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
const audio = document.getElementById("weddingMusic");
const proceedBtn = document.getElementById("proceedBtn");


/* ==========================
   MUSIC CONTROL
========================== */

musicBtn.addEventListener("click", async () => {

  try {

    if (audio.paused) {

      await audio.play();

      musicIcon.textContent = "❚❚";

      musicBtn.classList.add("playing");

    } else {

      audio.pause();

      musicIcon.textContent = "♫";

      musicBtn.classList.remove("playing");

    }

  } catch (error) {

    console.log("Music could not be played:", error);

  }

});


/* ==========================
   PROCEED BUTTON
========================== */

proceedBtn.addEventListener("click", () => {

  document.querySelector(".arch").classList.add("leaving");

  setTimeout(() => {

    window.location.href = "details.html";

  }, 700);

});