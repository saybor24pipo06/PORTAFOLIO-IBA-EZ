/* =========================================================
   SN STUDIO
   PORTAFOLIO PROFESIONAL
   JAVASCRIPT — CINEMATIC EDITION
========================================================= */

"use strict";


/* =========================================================
   VARIABLES GENERALES
========================================================= */

const body = document.body;
const html = document.documentElement;

const isTouch =
    window.matchMedia("(pointer: coarse)").matches;

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================================================
   LOADER
   IMPORTANTE:
   NUNCA BLOQUEARÁ LA PÁGINA
========================================================= */

(function initLoader() {

    const loader = document.getElementById("preloader");

    if (!loader) return;


    let loaderClosed = false;


    function closeLoader() {

        if (loaderClosed) return;

        loaderClosed = true;

        loader.classList.add("hidden");

        setTimeout(() => {

            loader.style.display = "none";

        }, 900);

    }


    /*
        Esperamos a que cargue la página,
        pero nunca más de 3.5 segundos.
    */

    window.addEventListener("load", () => {

        setTimeout(closeLoader, 500);

    });


    /*
        SEGURIDAD ABSOLUTA
    */

    setTimeout(closeLoader, 3500);

})();



/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTOS PRINCIPALES
    ===================================================== */

    const header =
        document.getElementById("header");

    const nav =
        document.getElementById("nav");

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const revealElements =
        document.querySelectorAll(".reveal");



    /* =====================================================
       HEADER DINÁMICO
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 70) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();



    /* =====================================================
       MENÚ MOBILE
    ===================================================== */

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const opened =
                nav.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                opened
            );

            menuToggle.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

            body.classList.toggle(
                "menu-open",
                opened
            );

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                body.classList.remove(
                    "menu-open"
                );

            });

        });

    }



    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) return;


                const target =
                    document.querySelector(targetID);

                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            });

        });



    /* =====================================================
       REVEAL DE SECCIONES
    ===================================================== */

    if (
        !prefersReducedMotion &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -60px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }



    /* =====================================================
       ANIMACIÓN DE TÍTULOS
    ===================================================== */

    const animatedTitles =
        document.querySelectorAll(
            ".hero-content h1, " +
            ".section-header h2, " +
            ".statement h2, " +
            ".cta-content h2"
        );


    animatedTitles.forEach(title => {

        title.classList.add("title-reveal");

    });



    /* =====================================================
       HERO — PARALLAX DEL MOUSE
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroImage =
        document.querySelector(
            ".hero-image-wrapper"
        );


    if (
        hero &&
        heroImage &&
        !isTouch &&
        !prefersReducedMotion
    ) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();


                const mouseX =
                    (
                        event.clientX -
                        rect.left
                    ) / rect.width -
                    0.5;


                const mouseY =
                    (
                        event.clientY -
                        rect.top
                    ) / rect.height -
                    0.5;


                targetX =
                    mouseX * 14;


                targetY =
                    mouseY * 14;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                targetX = 0;

                targetY = 0;

            }
        );


        function animateHeroParallax() {

            currentX +=
                (targetX - currentX) * 0.06;


            currentY +=
                (targetY - currentY) * 0.06;


            heroImage.style.transform =
                `translate3d(
                    ${currentX}px,
                    ${currentY}px,
                    0
                )`;


            requestAnimationFrame(
                animateHeroParallax
            );

        }


        animateHeroParallax();

    }



    /* =====================================================
       PARALLAX DURANTE SCROLL
    ===================================================== */

    const parallaxImages =
        document.querySelectorAll(
            ".hero-image, " +
            ".cta-background img, " +
            ".about-image img"
        );


    if (
        !isTouch &&
        !prefersReducedMotion &&
        parallaxImages.length
    ) {

        let ticking = false;


        function updateParallax() {

            const viewport =
                window.innerHeight;


            parallaxImages.forEach(image => {

                const rect =
                    image.getBoundingClientRect();


                if (
                    rect.bottom < 0 ||
                    rect.top > viewport
                ) return;


                const center =
                    rect.top +
                    rect.height / 2;


                const distance =
                    (
                        center -
                        viewport / 2
                    ) / viewport;


                const movement =
                    distance * -18;


                image.style.transform =
                    `translate3d(
                        0,
                        ${movement}px,
                        0
                    )`;

            });


            ticking = false;

        }


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;

                }

            },
            { passive: true }
        );


        updateParallax();

    }



    /* =====================================================
       CURSOR PREMIUM
    ===================================================== */

    const cursor =
        document.getElementById(
            "customCursor"
        );

    const cursorDot =
        document.querySelector(
            ".cursor-dot"
        );

    const cursorRing =
        document.querySelector(
            ".cursor-ring"
        );


    if (
        cursor &&
        cursorDot &&
        cursorRing &&
        !isTouch &&
        !prefersReducedMotion
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        function animateCursor() {

            ringX +=
                (
                    mouseX -
                    ringX
                ) * 0.14;


            ringY +=
                (
                    mouseY -
                    ringY
                ) * 0.14;


            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        const interactive =
            document.querySelectorAll(
                "a, button, input, textarea, select, " +
                ".project-card, .service-item"
            );


        interactive.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        });

    }



    /* =====================================================
       HOVER ESPECIAL PARA FOTOGRAFÍAS
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        !isTouch &&
        !prefersReducedMotion
    ) {

        projectCards.forEach(card => {

            const image =
                card.querySelector("img");


            if (!image) return;


            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) / rect.width -
                        0.5;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) / rect.height -
                        0.5;


                    image.style.transform =
                        `scale(1.06)
                         translate(
                            ${x * 8}px,
                            ${y * 8}px
                         )`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "scale(1) translate(0,0)";

                }
            );

        });

    }



    /* =====================================================
       FILTRO DE PORTAFOLIO
    ===================================================== */

    const filters =
        document.querySelectorAll(
            ".filter-btn"
        );


    if (
        filters.length &&
        projectCards.length
    ) {

        filters.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.filter;


                    filters.forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                    button.classList.add(
                        "active"
                    );


                    projectCards.forEach(
                        (card, index) => {

                            const category =
                                card.dataset.category;


                            const visible =
                                filter === "all" ||
                                category === filter;


                            if (visible) {

                                card.style.display =
                                    "";


                                setTimeout(() => {

                                    card.style.opacity =
                                        "1";

                                    card.style.transform =
                                        "translateY(0)";

                                }, index * 50);

                            } else {

                                card.style.opacity =
                                    "0";

                                card.style.transform =
                                    "translateY(20px)";


                                setTimeout(() => {

                                    card.style.display =
                                        "none";

                                }, 350);

                            }

                        }
                    );

                }
            );

        });

    }



    /* =====================================================
       EFECTO MAGNÉTICO
    ===================================================== */

    const magnetic =
        document.querySelectorAll(
            ".magnetic, .btn"
        );


    if (
        !isTouch &&
        !prefersReducedMotion
    ) {

        magnetic.forEach(element => {

            element.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    element.style.transform =
                        `translate(
                            ${x * 0.10}px,
                            ${y * 0.10}px
                        )`;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "";

                }
            );

        });

    }



    /* =====================================================
       SERVICIOS — EFECTO DE LÍNEA DORADA
    ===================================================== */

    const services =
        document.querySelectorAll(
            ".service-item"
        );


    services.forEach(service => {

        service.addEventListener(
            "mouseenter",
            () => {

                service.classList.add(
                    "service-hover"
                );

            }
        );


        service.addEventListener(
            "mouseleave",
            () => {

                service.classList.remove(
                    "service-hover"
                );

            }
        );

    });



    /* =====================================================
       CONTADORES
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) return;


                        const element =
                            entry.target;


                        const target =
                            Number(
                                element.dataset.counter
                            );


                        if (
                            Number.isNaN(target)
                        ) return;


                        let start = 0;

                        const duration = 1600;

                        const startTime =
                            performance.now();


                        function updateCounter(
                            currentTime
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        startTime
                                    ) / duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            start =
                                Math.floor(
                                    target *
                                    eased
                                );


                            element.textContent =
                                start;


                            if (progress < 1) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            }

                        }


                        requestAnimationFrame(
                            updateCounter
                        );


                        counterObserver.unobserve(
                            element
                        );

                    });

                },
                {
                    threshold: .7
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    }



    /* =====================================================
       REVEAL DE IMÁGENES
    ===================================================== */

    const imageReveals =
        document.querySelectorAll(
            ".project-image, " +
            ".about-image, " +
            ".hero-image-wrapper"
        );


    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const imageObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "image-visible"
                            );


                            imageObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: .15
                }
            );


        imageReveals.forEach(element => {

            element.classList.add(
                "image-reveal"
            );


            imageObserver.observe(
                element
            );

        });

    }



    /* =====================================================
       NAVEGACIÓN ACTIVA
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;


                            navLinks.forEach(link => {

                                link.classList.remove(
                                    "active"
                                );


                                const href =
                                    link.getAttribute(
                                        "href"
                                    );


                                if (
                                    href ===
                                    `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            });

                        }

                    });

                },
                {
                    rootMargin:
                        "-40% 0px -50% 0px"
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }



    /* =====================================================
       BOTÓN VOLVER ARRIBA
    ===================================================== */

    const backTop =
        document.querySelector(
            ".back-top"
        );


    if (backTop) {

        backTop.addEventListener(
            "click",
            event => {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );

    }



    /* =====================================================
       FORMULARIO
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    contactForm.querySelector(
                        '[name="name"], #name'
                    );


                const email =
                    contactForm.querySelector(
                        '[name="email"], #email'
                    );


                const message =
                    contactForm.querySelector(
                        '[name="message"], #message'
                    );


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    return;

                }


                if (
                    !name.value.trim() ||
                    !email.value.trim() ||
                    !message.value.trim()
                ) {

                    alert(
                        "Completa todos los campos."
                    );

                    return;

                }


                alert(
                    "Tu mensaje está listo para ser enviado."
                );


                contactForm.reset();

            }
        );

    }



    /* =====================================================
       EFECTO DE TEXTO AL HACER HOVER
    ===================================================== */

    const goldElements =
        document.querySelectorAll(
            ".gold-text, .section-number, " +
            ".logo-main, .small-title"
        );


    goldElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                element.classList.add(
                    "gold-shine"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.classList.remove(
                    "gold-shine"
                );

            }
        );

    });



    /* =====================================================
       ESC PARA CERRAR MENÚ
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) return;


            if (nav) {

                nav.classList.remove(
                    "open"
                );

            }


            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            body.classList.remove(
                "menu-open"
            );

        }
    );



    /* =====================================================
       EFECTO DE CARGA DE IMÁGENES
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            if (image.complete) {

                image.classList.add(
                    "loaded"
                );

            } else {

                image.addEventListener(
                    "load",
                    () => {

                        image.classList.add(
                            "loaded"
                        );

                    },
                    { once: true }
                );

            }

        });



    /* =====================================================
       AÑO AUTOMÁTICO
    ===================================================== */

    document
        .querySelectorAll(
            "[data-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });



    /* =====================================================
       PROTECCIÓN CONTRA ERRORES
    ===================================================== */

    window.addEventListener(
        "error",
        event => {

            /*
                Los errores de imágenes externas
                no detendrán el sitio.
            */

            if (
                event.target &&
                event.target.tagName === "IMG"
            ) {

                console.warn(
                    "Imagen no encontrada:",
                    event.target.src
                );

            }

        },
        true
    );

});