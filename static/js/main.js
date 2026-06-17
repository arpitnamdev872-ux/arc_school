/* ===================================
   DOM LOADED
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavbar();

    initializeCounters();

    initializeScrollAnimations();

    initializeSmoothScrolling();

    initializeBackToTop();

    initializeGalleryEffects();

    initializeMobileMenu();

});


/* ===================================
   NAVBAR EFFECT
=================================== */

function initializeNavbar() {

    const header = document.querySelector("header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 100) {

            header.style.padding = "0px";
            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.15)";

        } else {

            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,0.08)";
        }

    });

}


/* ===================================
   SMOOTH SCROLLING
=================================== */

function initializeSmoothScrolling() {

    document.querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                e.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });

}


/* ===================================
   COUNTER ANIMATION
=================================== */

function initializeCounters() {

    const counters =
        document.querySelectorAll(".stat-card h3");

    if (!counters.length) return;

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const counter =
                        entry.target;

                    const target =
                        parseInt(
                            counter.innerText.replace(/\D/g, '')
                        );

                    animateCounter(counter, target);

                    observer.unobserve(counter);

                }

            });

        }, { threshold: 0.5 });

    counters.forEach(counter =>
        observer.observe(counter)
    );

}


function animateCounter(element, target) {

    let count = 0;

    const speed = target / 100;

    const update = () => {

        count += speed;

        if (count < target) {

            element.innerText =
                Math.floor(count) + "+";

            requestAnimationFrame(update);

        } else {

            element.innerText =
                target + "+";

        }

    };

    update();

}


/* ===================================
   SCROLL REVEAL ANIMATION
=================================== */

function initializeScrollAnimations() {

    const elements =
        document.querySelectorAll(
            "section, .card, .facility-grid div"
        );

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show-element"
                    );

                }

            });

        }, {
            threshold: 0.15
        });

    elements.forEach(element => {

        element.classList.add(
            "hidden-element"
        );

        observer.observe(element);

    });

}


/* ===================================
   ACTIVE MENU HIGHLIGHT
=================================== */

window.addEventListener("scroll", () => {

    let current = "";

    document.querySelectorAll("section")
        .forEach(section => {

            const sectionTop =
                section.offsetTop;

            if (
                pageYOffset >=
                sectionTop - 150
            ) {

                current =
                    section.getAttribute("id");

            }

        });

    document.querySelectorAll(
        ".nav-links a"
    ).forEach(link => {

        link.classList.remove(
            "active-link"
        );

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add(
                "active-link"
            );

        }

    });

});


/* ===================================
   BACK TO TOP BUTTON
=================================== */

function initializeBackToTop() {

    const button =
        document.createElement("button");

    button.innerHTML = "↑";

    button.id = "backToTop";

    document.body.appendChild(button);

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.style.display = "block";

        } else {

            button.style.display = "none";

        }

    });

}


/* ===================================
   GALLERY EFFECTS
=================================== */

function initializeGalleryEffects() {

    const images =
        document.querySelectorAll(
            ".gallery-grid img"
        );

    images.forEach(image => {

        image.addEventListener(
            "mouseenter",
            () => {

                image.style.transform =
                    "scale(1.08) rotate(1deg)";

            }
        );

        image.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1) rotate(0deg)";

            }
        );

    });

}


/* ===================================
   PARALLAX HERO EFFECT
=================================== */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector("#hero");

    if (!hero) return;

    const scroll =
        window.pageYOffset;

    hero.style.backgroundPositionY =
        scroll * 0.5 + "px";

});


/* ===================================
   LOADING ANIMATION
=================================== */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});


/* ===================================
   CURRENT YEAR IN FOOTER
=================================== */

const yearElement =
    document.getElementById("currentYear");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}

/* ===================================
   MOBILE MENU TOGGLE
=================================== */

function initializeMobileMenu() {

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

    }

}