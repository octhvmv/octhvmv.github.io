(function() {
    "use strict";

    /*
     Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /*
     Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /*
     Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /*
     Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /*
     Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        })
    }

    /*
     Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /*
     Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('fa-ellipsis')
        this.classList.toggle('fa-ellipsis-vertical')
    })

    /*
     Scroll with offset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let body = select('body')
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /*
     * Scroll with offset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /*
     * Home type effect
     */
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /*
     Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function(direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }

    /*
     Project isotope and filter

    window.addEventListener('load', () => {
        let  projectContainer = select('. project-container');
        if ( projectContainer) {
            let  projectIsotope = new Isotope( projectContainer, {
                itemSelector: '. project-item'
            });

            let  projectFilters = select('# project-flters li', true);

            on('click', '# project-flters li', function(e) {
                e.preventDefault();
                 projectFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                 projectIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                 projectIsotope.on('arrangeComplete', function() {
                    AOS.refresh()
                });
            }, true);
        }

    });
    */

    /*
    Translate

    const translateButton = document.getElementById("translate-button");
    translateButton.addEventListener("click", () => {
        const sourceLang = "en"; // la langue actuelle de votre site
        const targetLang = "fr"; // la langue cible de la traduction

        // récupération de tous les éléments de texte du site
        const textElements = document.querySelectorAll("body *");

        // traduction de chaque élément de texte
        textElements.forEach(async element => {
            const text = element.textContent;
            const translatedText = await translateText(text, sourceLang, targetLang);
            element.textContent = translatedText;
        });
    });
    async function translateText(text, sourceLang, targetLang) {
        const apiKey = "918615e7-9115-f66b-def6-4f892349a35a";
        const endpoint = "https://api.deepl.com/v2/translate";

        const data = {
            auth_key: apiKey,
            text: text,
            source_lang: sourceLang,
            target_lang: targetLang
        };

        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json.translations[0].text;
    }
    */

    /*
     Initiate  project lightbox
     */
    const  projectLightbox = GLightbox({
        selector: '. project-lightbox'
    });

    /*
     project details slider
     */
    new Swiper('. project-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /*
     Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    /*
     Initiate Pure Counter
     */
    new PureCounter();

})()