const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");


// =====================================
// MUSIC BUTTON
// =====================================

function updateMusicButton() {

  if (music.paused) {

    musicIcon.textContent = "▶";

    musicBtn.setAttribute(
      "aria-label",
      "Play wedding music"
    );

    musicBtn.setAttribute(
      "aria-pressed",
      "false"
    );

    musicBtn.classList.remove("playing");

  } else {

    musicIcon.textContent = "❚❚";

    musicBtn.setAttribute(
      "aria-label",
      "Pause wedding music"
    );

    musicBtn.setAttribute(
      "aria-pressed",
      "true"
    );

    musicBtn.classList.add("playing");

  }

}


// =====================================
// PLAY / PAUSE
// =====================================

musicBtn.addEventListener("click", async () => {

  try {

    if (music.paused) {

      await music.play();

    } else {

      music.pause();

    }

    updateMusicButton();

  } catch (error) {

    console.log(
      "Music could not be played:",
      error
    );

  }

});


// =====================================
// KEEP BUTTON IN SYNC
// =====================================

music.addEventListener(
  "play",
  updateMusicButton
);

music.addEventListener(
  "pause",
  updateMusicButton
);

music.addEventListener(
  "ended",
  updateMusicButton
);


// =====================================
// INITIAL STATE
// =====================================

updateMusicButton();
