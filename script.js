const portfolioPrev = document.querySelector('.portfolio__arrow_prev');
const portfolioNext = document.querySelector('.portfolio__arrow_next');
const portfolioNumber = document.querySelector('.portfolio__pagination-number');
const portfolioProgress = document.querySelector('.portfolio__pagination-progress');
const partnersNumber = document.querySelector('.partners__pagination-number');
const partnersProgress = document.querySelector('.partners__pagination-progress');

function getSlidesGroup(swiper) {
    return swiper.params.slidesPerGroup || 1;
}

function getCurrentPage(swiper) {
    const slidesGroup = getSlidesGroup(swiper);
    return Math.min(
        Math.floor(swiper.activeIndex / slidesGroup) + 1,
        getTotalPages(swiper)
    );
}

function getTotalPages(swiper) {
    const slidesGroup = getSlidesGroup(swiper);
    return Math.max(1, Math.ceil(swiper.slides.length / slidesGroup));
}
function updatePortfolioPagination(swiper) {
    const current = getCurrentPage(swiper);
    const total = getTotalPages(swiper);

    if (portfolioNumber) {
        portfolioNumber.textContent = `${String(current).padStart(2, '0')}/${String(total).padStart(2, '0')}`;
    }

    if (portfolioProgress) {
        const progress = total > 0 ? (current / total) * 100 : 100;
        portfolioProgress.style.width = `${progress}%`;
    }
}

if (typeof Swiper !== 'undefined') {
    const portfolioSwiper = new Swiper('.portfolio__track', {
        slidesPerView: 1,
        spaceBetween: 16,
        slidesPerGroup: 1,
        speed: 600,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.portfolio__arrow_next',
            prevEl: '.portfolio__arrow_prev',
        },
        breakpoints: {
            425: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 1.5,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            1440: {
                slidesPerView: 2.5,
                spaceBetween: 24,
            },
            1920: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
        on: {
            init() {
                this.update();
                updatePortfolioPagination(this);
            },
            slideChange() {
                updatePortfolioPagination(this);
            },
            resize() {
                updatePortfolioPagination(this);
            },
        },
    });

    function updatePartnersPagination(swiper) {
        const current = getCurrentPage(swiper);
        const total = getTotalPages(swiper);

        if (partnersNumber) {
            partnersNumber.textContent = `${String(current).padStart(2, '0')}/${String(total).padStart(2, '0')}`;
        }

        if (partnersProgress) {
            const progress = total > 0 ? (current / total) * 100 : 100;
            partnersProgress.style.width = `${progress}%`;
        }
    }

    const partnersSwiper = new Swiper('.partners__track', {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 600,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: '.partners__arrow_next',
            prevEl: '.partners__arrow_prev',
        },
        on: {
            init() {
                this.update();
                updatePartnersPagination(this);
            },
            slideChange() {
                updatePartnersPagination(this);
            },
            resize() {
                updatePartnersPagination(this);
            },
        },
    });
}


const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length) {
    faqItems.forEach((item) => {
        const button = item.querySelector('.faq-item__header');
        const content = item.querySelector('.faq-item__content');

        if (!button || !content) return;

        content.style.height = '0px';

        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('faq-item_active');

            if (isOpen) {
                content.style.height = `${content.scrollHeight}px`;

                requestAnimationFrame(() => {
                    item.classList.remove('faq-item_active');
                    content.style.height = '0px';
                });
            } else {
                item.classList.add('faq-item_active');
                content.style.height = `${content.scrollHeight}px`;

                const onTransitionEnd = (event) => {
                    if (event.propertyName === 'height' && item.classList.contains('faq-item_active')) {
                        content.style.height = 'auto';
                    }
                    content.removeEventListener('transitionend', onTransitionEnd);
                };

                content.addEventListener('transitionend', onTransitionEnd);
            }
        });
    });

    window.addEventListener('resize', () => {
        faqItems.forEach((item) => {
            const content = item.querySelector('.faq-item__content');
            if (!content) return;

            if (item.classList.contains('faq-item_active')) {
                content.style.height = 'auto';
            } else {
                content.style.height = '0px';
            }
        });
    });
}



const burger = document.querySelector('.header__burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu__close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');

if (burger && mobileMenu && mobileMenuClose) {
    const openMenu = () => {
        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    burger.addEventListener('click', openMenu);
    mobileMenuClose.addEventListener('click', closeMenu);

    mobileMenuLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}



