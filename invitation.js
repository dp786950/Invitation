/* =========================================================
   WEDDING INVITATION JAVASCRIPT
   Music: Dondo.mp3
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     COUNTDOWN
     ========================================================= */

  const weddingDate =
    new Date("September 26, 2026 13:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {

    const difference = weddingDate - Date.now();

    if (difference <= 0) {

      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";

      return;
    }

    const days =
      Math.floor(difference / 86400000);

    const hours =
      Math.floor(
        (difference % 86400000) / 3600000
      );

    const minutes =
      Math.floor(
        (difference % 3600000) / 60000
      );

    const seconds =
      Math.floor(
        (difference % 60000) / 1000
      );

    if (daysEl) {
      daysEl.textContent =
        String(days).padStart(2, "0");
    }

    if (hoursEl) {
      hoursEl.textContent =
        String(hours).padStart(2, "0");
    }

    if (minutesEl) {
      minutesEl.textContent =
        String(minutes).padStart(2, "0");
    }

    if (secondsEl) {
      secondsEl.textContent =
        String(seconds).padStart(2, "0");
    }
  }

  updateCountdown();

  setInterval(updateCountdown, 1000);


  /* =========================================================
     WEDDING MUSIC — DONDO
     ========================================================= */

  const music =
    document.getElementById("weddingMusic");

  const musicButton =
    document.getElementById("musicButton");

  const musicIcon =
    musicButton
      ? musicButton.querySelector(".music-icon")
      : null;

  const toast =
    document.getElementById("toast");

  let toastTimer = null;

  let userHasInteracted = false;


  /* ---------------------------------------------------------
     Music settings
     --------------------------------------------------------- */

  if (music) {

    music.loop = true;

    music.preload = "auto";

    music.volume = 0.85;
  }


  /* ---------------------------------------------------------
     Toast message
     --------------------------------------------------------- */

  function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {

      toast.classList.remove("show");

    }, 2500);
  }


  /* ---------------------------------------------------------
     Change music button appearance
     --------------------------------------------------------- */

  function updateMusicButton(isPlaying) {

    if (!musicButton) return;

    if (isPlaying) {

      musicButton.classList.add("is-playing");

      musicButton.setAttribute(
        "aria-pressed",
        "true"
      );

      musicButton.setAttribute(
        "aria-label",
        "Pause wedding music"
      );

      musicButton.setAttribute(
        "title",
        "Pause music"
      );

      if (musicIcon) {
        musicIcon.textContent = "❚❚";
      }

    } else {

      musicButton.classList.remove("is-playing");

      musicButton.setAttribute(
        "aria-pressed",
        "false"
      );

      musicButton.setAttribute(
        "aria-label",
        "Play wedding music"
      );

      musicButton.setAttribute(
        "title",
        "Play music"
      );

      if (musicIcon) {
        musicIcon.textContent = "♫";
      }
    }
  }


  /* ---------------------------------------------------------
     PLAY MUSIC
     --------------------------------------------------------- */

  async function playMusic(showMessage = false) {

    if (!music) {

      console.error(
        "Music element not found."
      );

      return false;
    }

    try {

      await music.play();

      updateMusicButton(true);

      if (showMessage) {

        showToast(
          "Dondo is playing ♫"
        );
      }

      return true;

    } catch (error) {

      /*
       Browser autoplay protection may block
       music until the visitor interacts with
       the page.
      */

      updateMusicButton(false);

      console.log(
        "Autoplay was blocked. Waiting for user interaction."
      );

      return false;
    }
  }


  /* ---------------------------------------------------------
     PAUSE MUSIC
     --------------------------------------------------------- */

  function pauseMusic() {

    if (!music) return;

    music.pause();

    updateMusicButton(false);
  }


  /* ---------------------------------------------------------
     MUSIC BUTTON
     --------------------------------------------------------- */

  if (musicButton) {

    musicButton.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        userHasInteracted = true;

        if (!music) return;

        if (music.paused) {

          playMusic(true);

        } else {

          pauseMusic();
        }
      }
    );
  }


  /* =========================================================
     START MUSIC AFTER FIRST TOUCH / CLICK
     ========================================================= */

  function startMusicAfterInteraction() {

    if (userHasInteracted) {
      return;
    }

    userHasInteracted = true;

    if (music && music.paused) {

      playMusic(true);

    }

    removeInteractionListeners();
  }


  function removeInteractionListeners() {

    document.removeEventListener(
      "click",
      startMusicAfterInteraction
    );

    document.removeEventListener(
      "touchstart",
      startMusicAfterInteraction
    );

    document.removeEventListener(
      "keydown",
      startMusicAfterInteraction
    );
  }


  /*
   Listen for the visitor's first interaction.

   This makes the music start even if the browser
   blocks automatic autoplay.
  */

  document.addEventListener(
    "click",
    startMusicAfterInteraction,
    { passive: true }
  );

  document.addEventListener(
    "touchstart",
    startMusicAfterInteraction,
    { passive: true }
  );

  document.addEventListener(
    "keydown",
    startMusicAfterInteraction,
    { passive: true }
  );


  /* ---------------------------------------------------------
     TRY AUTOPLAY IMMEDIATELY
     --------------------------------------------------------- */

  playMusic(false);


  /* ---------------------------------------------------------
     MUSIC EVENTS
     --------------------------------------------------------- */

  if (music) {

    music.addEventListener(
      "play",
      function () {

        updateMusicButton(true);

      }
    );


    music.addEventListener(
      "pause",
      function () {

        updateMusicButton(false);

      }
    );


    music.addEventListener(
      "ended",
      function () {

        updateMusicButton(false);

      }
    );


    music.addEventListener(
      "error",
      function () {

        updateMusicButton(false);

        console.error(
          "Dondo.mp3 could not be loaded."
        );

        showToast(
          "Music file not found. Check Dondo.mp3"
        );
      }
    );
  }


  /* =========================================================
     BACK TO TOP BUTTON
     ========================================================= */

  const backToTop =
    document.getElementById("backToTop");


  function toggleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 350) {

      backToTop.classList.add("show");

    } else {

      backToTop.classList.remove("show");
    }
  }


  window.addEventListener(
    "scroll",
    toggleBackToTop,
    { passive: true }
  );


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      function () {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );
  }


  toggleBackToTop();


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const id =
            link.getAttribute("href");

          if (!id || id === "#") {
            return;
          }

          const target =
            document.querySelector(id);

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });
/* =========================================================
   FLOATING LOVE BUBBLES
   ========================================================= */

const loveContainer = document.createElement("div");

loveContainer.className = "love-bubbles";

document.body.prepend(loveContainer);


function createLoveBubble() {

    const bubble = document.createElement("div");

    bubble.className = "love-bubble";

    /* Responsive bubble size */
    const size =
        Math.floor(Math.random() * 28) + 22;

    /* Random position */
    const left =
        Math.random() * 100;

    /* Different floating speeds */
    const duration =
        Math.floor(Math.random() * 10) + 12;

    /* Random sideways movement */
    const sway =
        Math.floor(Math.random() * 3) + 2;

    /* Random starting delay */
    const delay =
        Math.random() * 8;

    bubble.style.left = left + "%";

    bubble.style.setProperty(
        "--size",
        size + "px"
    );

    bubble.style.setProperty(
        "--duration",
        duration + "s"
    );

    bubble.style.setProperty(
        "--sway",
        sway + "s"
    );

    bubble.style.setProperty(
        "--delay",
        delay + "s"
    );

    loveContainer.appendChild(bubble);


    /* Remove old bubbles */
    setTimeout(function () {

        bubble.remove();

    }, (duration + delay) * 1000);
}


/* Create initial bubbles */

for (let i = 0; i < 16; i++) {

    createLoveBubble();

}


/* Keep creating new bubbles */

setInterval(function () {

    createLoveBubble();

}, 1200);

});