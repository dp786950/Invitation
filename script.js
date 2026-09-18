/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


/* =========================
   CLOSE MENU AFTER CLICK
========================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});


/* =========================
   ACTIVE NAVIGATION LINK
========================= */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop &&
            pageYOffset < sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            === "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================
   SCROLL TO TOP BUTTON
========================= */

const scrollTop =
    document.getElementById("scrollTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTop.style.display =
            "block";

    }

    else {

        scrollTop.style.display =
            "none";

    }

});


scrollTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;


        formMessage.textContent =
            "Thank you, " +
            name +
            "! Your message has been received successfully.";


        contactForm.reset();


        setTimeout(() => {

            formMessage.textContent = "";

        }, 5000);

    }
);


/* =========================
   GALLERY IMAGE POPUP
========================= */

const galleryImages =
    document.querySelectorAll(
        ".gallery-grid img"
    );


const imagePopup =
    document.getElementById(
        "imagePopup"
    );


const popupImage =
    document.getElementById(
        "popupImage"
    );


const closePopup =
    document.getElementById(
        "closePopup"
    );


galleryImages.forEach(image => {

    image.addEventListener(
        "click",
        () => {

            popupImage.src =
                image.src;


            imagePopup.style.display =
                "flex";

        }
    );

});


closePopup.addEventListener(
    "click",
    () => {

        imagePopup.style.display =
            "none";

    }
);


/* =========================
   CLOSE POPUP OUTSIDE IMAGE
========================= */

imagePopup.addEventListener(
    "click",
    (event) => {

        if (
            event.target === imagePopup
        ) {

            imagePopup.style.display =
                "none";

        }

    }
);


/* =========================
   ESCAPE KEY CLOSE POPUP
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            imagePopup.style.display =
                "none";

        }

    }
);