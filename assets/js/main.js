
/* =========================================================
   BLESSING ALL GOD'S CHILDREN
   Main JavaScript
   Version: 2.1
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01. ELEMENT REFERENCES
    ====================================================== */

    const header = document.querySelector(".site-header");

    const menuToggle = document.querySelector("#mobile-menu-toggle");

    const navigation = document.querySelector("#main-navigation");

    const backToTop = document.querySelector(".back-to-top");

    const navLinks = document.querySelectorAll(
        ".nav-link[href^='#']"
    );


    /* =====================================================
       02. LUCIDE ICONS
    ====================================================== */

    function initializeIcons() {

        if (window.lucide) {
            window.lucide.createIcons();
        }

    }

    initializeIcons();


    /* =====================================================
       03. MOBILE NAVIGATION
    ====================================================== */

    function openMenu() {

        if (!navigation || !menuToggle) return;

        navigation.classList.add("open");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        menuToggle.innerHTML = `
            <i data-lucide="x"></i>
        `;

        initializeIcons();

    }


    function closeMenu() {

        if (!navigation || !menuToggle) return;

        navigation.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.innerHTML = `
            <i data-lucide="menu"></i>
        `;

        initializeIcons();

    }


    if (menuToggle && navigation) {

        /* Toggle navigation */

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navigation.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        /* Close navigation after selecting a link */

        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        /* Close navigation when clicking outside */

        document.addEventListener("click", event => {

            const clickedInsideNavigation =
                navigation.contains(event.target);

            const clickedMenuToggle =
                menuToggle.contains(event.target);

            if (
                navigation.classList.contains("open") &&
                !clickedInsideNavigation &&
                !clickedMenuToggle
            ) {
                closeMenu();
            }

        });


        /* Close navigation using Escape */

        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                navigation.classList.contains("open")
            ) {
                closeMenu();
                menuToggle.focus();
            }

        });


        /* Close navigation when returning to desktop */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 991) {
                closeMenu();
            }

        });

    }


    /* =====================================================
       04. STICKY HEADER SHADOW
    ====================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       05. SMOOTH SCROLL
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: Math.max(0, targetPosition),

                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth"

            });

            /* Update browser URL without an abrupt jump */

            if (history.replaceState) {
                history.replaceState(null, "", targetId);
            }

        });

    });


    /* =====================================================
       06. BACK TO TOP
    ====================================================== */

    if (backToTop) {

        backToTop.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({

                top: 0,

                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth"

            });

        });

    }


    /* =====================================================
       07. AUTOMATIC COPYRIGHT YEAR
    ====================================================== */

    const currentYearElements = document.querySelectorAll(
        "[data-current-year]"
    );


    currentYearElements.forEach(element => {

        element.textContent = new Date().getFullYear();

    });


    /* =====================================================
       08. ACTIVE NAVIGATION ON SCROLL
    ====================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    if (
        "IntersectionObserver" in window &&
        sections.length > 0
    ) {

        const sectionObserver = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const currentSectionId =
                        entry.target.getAttribute("id");


                    navLinks.forEach(link => {

                        const linkTarget =
                            link.getAttribute("href");

                        const isActive =
                            linkTarget === `#${currentSectionId}`;


                        link.classList.toggle(
                            "active",
                            isActive
                        );


                        if (isActive) {

                            link.setAttribute(
                                "aria-current",
                                "location"
                            );

                        } else {

                            link.removeAttribute("aria-current");

                        }

                    });

                });

            },

            {
                root: null,
                rootMargin: "-25% 0px -65% 0px",
                threshold: 0
            }

        );


        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       09. EXTERNAL LINK SECURITY
    ====================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       10. IMAGE FALLBACK
    ====================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            console.warn(
                "Image failed to load:",
                image.getAttribute("src")
            );

            image.classList.add("image-load-error");

        });

    });


    /* =====================================================
       11. INITIALIZATION COMPLETE
    ====================================================== */

    initializeIcons();

    updateHeader();

    console.log(
        "Blessing All God's Children homepage initialized successfully."
    );

});
