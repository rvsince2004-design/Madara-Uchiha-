/* =========================================================
   MADARA UCHIHA
   INTERACTION ENGINE
   ========================================================= */


// =========================================================
// LOADER
// =========================================================

document.body.classList.add("loading");

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        loader.classList.add("hidden");

        document.body.classList.remove("loading");

    }, 1500);

});


// =========================================================
// CUSTOM CURSOR
// =========================================================

const cursor = document.querySelector(".cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;


window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);

}


animateCursor();


const interactiveElements =
    document.querySelectorAll("a, button, .power-card");


interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
    });

});


// =========================================================
// HERO MOUSE PARALLAX
// =========================================================

const heroCenter = document.querySelector(".hero-center");

window.addEventListener("mousemove", (event) => {

    if (!heroCenter) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 20;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 20;

    heroCenter.style.transform =
        `translate(${x}px, ${y}px)`;

});


// =========================================================
// ENTER BUTTON
// =========================================================

const enterButton =
    document.getElementById("enterButton");


if (enterButton) {

    enterButton.addEventListener("click", () => {

        document.getElementById("power")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}


// =========================================================
// POWER CARD INTERACTION
// =========================================================

const cards =
    document.querySelectorAll(".power-card");


cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        cards.forEach((other) => {
            other.classList.remove("active");
        });

        card.classList.add("active");

    });

});


// =========================================================
// MADARA FORMS
// =========================================================

const forms = [

    {
        title: "ETERNAL<br>MANGEKYŌ",
        description:
            "The culmination of Uchiha ocular power, carrying the legacy of generations."
    },

    {
        title: "RINNEGAN<br>AWAKENED",
        description:
            "A transformation that elevated Madara beyond ordinary shinobi and opened the path to extraordinary abilities."
    },

    {
        title: "TEN TAILS<br>JINCHŪRIKI",
        description:
            "Madara reaches a terrifying level of power after becoming the vessel of the Ten-Tails."
    },

    {
        title: "SIX PATHS<br>MADARA",
        description:
            "The ultimate stage of Madara's power, combining overwhelming chakra with Six Paths abilities."
    }

];


const formButtons =
    document.querySelectorAll(".form-button");

const formTitle =
    document.getElementById("formTitle");

const formDescription =
    document.getElementById("formDescription");

const formNumber =
    document.querySelector(".form-background-number");


formButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        formButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        formTitle.style.opacity = "0";
        formDescription.style.opacity = "0";

        setTimeout(() => {

            formTitle.innerHTML =
                forms[index].title;

            formDescription.textContent =
                forms[index].description;

            formNumber.textContent =
                `0${index + 1}`;

            formTitle.style.opacity = "1";
            formDescription.style.opacity = "1";

        }, 250);

    });

});


// =========================================================
// PARTICLE SYSTEM
// =========================================================

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}


resizeCanvas();


window.addEventListener("resize", resizeCanvas);


class Particle {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 1.5 + 0.3;

        this.speed =
            Math.random() * 0.25 + 0.05;

        this.opacity =
            Math.random() * 0.5 + 0.1;

    }


    update() {

        this.y -= this.speed;

        if (this.y < -10) {

            this.y =
                canvas.height + 10;

            this.x =
                Math.random() * canvas.width;

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(180, 20, 20, ${this.opacity})`;

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const amount =
        Math.min(
            180,
            Math.floor(
                (window.innerWidth *
                window.innerHeight) / 12000
            )
        );

    for (let i = 0; i < amount; i++) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


window.addEventListener("resize", createParticles);


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {

        particle.update();
        particle.draw();

    });

    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements =
    document.querySelectorAll(
        ".section-heading, .power-card, .form-stage, .legacy-content"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(50px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    revealObserver.observe(element);

});


// =========================================================
// SOUND BUTTON
// =========================================================

const soundToggle =
    document.getElementById("soundToggle");


let soundOn = false;


soundToggle.addEventListener("click", () => {

    soundOn = !soundOn;

    soundToggle.querySelector("span").textContent =
        soundOn ? "ON" : "OFF";

});