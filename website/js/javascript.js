
/* ========================================
   MENU IN TO HAMBURGER - MOBIL AND TABLET
======================================== */


const menuToggle = document.getElementById("menu-toggle");
const topnav = document.getElementById("myTopnav");

menuToggle.addEventListener("click", function () {

    const isOpen = topnav.classList.toggle("responsive");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Menü schließen" : "Menü öffnen"
    );

});



/* ========================================
   SIDE NAVIGATION / SCROLL SPY
======================================== */

(function () {

    const nav = document.querySelector('.side-nav');

    if (!nav) return;

    const buttons = [...nav.querySelectorAll('.side-nav-btn')];
    const indicator = nav.querySelector('.side-nav-indicator');
    const backToTop = document.querySelector('.back-to-top');
    const secondSection = document.querySelector('.second-section');

    const sections = buttons.map(button =>
        document.getElementById(button.dataset.target)
    );

    let activeIndex = -1;

     

    function moveIndicator(button) {

        const navRect = nav.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        const position = buttonRect.top - navRect.top;

        indicator.style.width = buttonRect.width + 'px';
        indicator.style.height = buttonRect.height + 'px';

        indicator.style.transform =
            `translate(-50%, ${position}px)`;

    }

   

    function setActive(index) {

        if (index === activeIndex) return;

        activeIndex = index;

        buttons.forEach((button, i) => {

            button.classList.toggle('is-active', i === index);

            if (i === index) {
                button.setAttribute('aria-current', 'location');
            } else {
                button.removeAttribute('aria-current');
            }

        });

        moveIndicator(buttons[index]);

    }

    /* ----------------------------------BUTTON CLICK */

    buttons.forEach((button, index) => {

        button.addEventListener('click', () => {

            const section = sections[index];

            if (!section) return;

            if (index === 0) {

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

            } else {

                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }

        });

    });

    

    function updateNavigation() {

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;if (secondSection) {
            if (secondSection) {

                const sectionTop =
                    secondSection.getBoundingClientRect().top;
            
                nav.classList.toggle(
                    'is-visible',
                    sectionTop <= windowHeight * 0.5
                );
            
            }

    const sectionTop =
        secondSection.getBoundingClientRect().top;

    nav.classList.toggle(
        'is-visible',
        sectionTop <= windowHeight * 0.5
    );

}


        const pageHeight =
            document.documentElement.scrollHeight;

        const triggerPosition =
            scrollPosition + windowHeight * 0.35;

        const isBottom =
            scrollPosition + windowHeight >= pageHeight - 10;

        let currentIndex = 0;

        sections.forEach((section, index) => {

            if (!section) return;

            const sectionTop =
                section.getBoundingClientRect().top + scrollPosition;

            if (triggerPosition >= sectionTop) {

                currentIndex = index;

            }

        });

       

        if (isBottom && scrollPosition > 0) {

            currentIndex = buttons.length - 1;

        }

        setActive(currentIndex);

        /*---------------------------------- SHOW BACK TO TOP */

        if (backToTop) {

            backToTop.classList.toggle(
                'is-visible',
                currentIndex === buttons.length - 1
            );

        }

    }

    /* ---------------------------------- BACK TO TOP */

    if (backToTop) {

        backToTop.addEventListener('click', () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        });

    }

    

    window.addEventListener('scroll', updateNavigation, {
        passive: true
    });

     

    window.addEventListener('resize', () => {

        updateNavigation();

        if (activeIndex >= 0) {

            moveIndicator(buttons[activeIndex]);

        }

    });

     

    requestAnimationFrame(updateNavigation);

})();