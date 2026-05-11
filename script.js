document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // BURGER MENU
    // =========================================

    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.mobile-menu__close');

    function openMenu() {
        menu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }

    burger?.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);

    // Закрытие по клику на ссылку меню
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // =========================================
    // FAQ ACCORDION
    // =========================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-item__header');

        header?.addEventListener('click', () => {
            const isActive = item.classList.contains('faq-item_active');

            // Закрываем все
            faqItems.forEach(el => {
                el.classList.remove('faq-item_active');
                el.querySelector('.faq-item__header')
                    ?.setAttribute('aria-expanded', 'false');
            });

            // Открываем кликнутый если не был открыт
            if (!isActive) {
                item.classList.add('faq-item_active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });


    // =========================================
    // PORTFOLIO SLIDER
    // =========================================

    const portfolioTrack = document.querySelector('.portfolio__track');
    const portfolioCards = portfolioTrack?.querySelectorAll('.portfolio-card');
    const portfolioPrev = document.querySelector('.portfolio__arrow_prev');
    const portfolioNext = document.querySelector('.portfolio__arrow_next');
    const portfolioNumber = document.querySelector('.portfolio__pagination-number');
    const portfolioProgress = document.querySelector('.portfolio__pagination-progress');

    if (portfolioTrack && portfolioCards?.length) {
        let portfolioCurrent = 0;
        const portfolioTotal = portfolioCards.length;
        const portfolioVisible = () => window.innerWidth <= 1024 ? 2 : 3;

        function portfolioUpdate() {
            const visible = portfolioVisible();
            const maxIndex = portfolioTotal - visible;
            portfolioCurrent = Math.min(portfolioCurrent, maxIndex);

            const cardWidth = portfolioCards[0].offsetWidth + 16;
            portfolioTrack.style.transform = `translateX(-${portfolioCurrent * cardWidth}px)`;
            portfolioTrack.style.transition = 'transform 0.4s ease';

            const current = portfolioCurrent + 1;
            const pages = maxIndex + 1;
            portfolioNumber && (portfolioNumber.textContent =
                `${String(current).padStart(2, '0')}/${String(pages).padStart(2, '0')}`);

            if (portfolioProgress) {
                portfolioProgress.style.width = `${(current / pages) * 100}%`;
            }
        }

        portfolioPrev?.addEventListener('click', () => {
            if (portfolioCurrent > 0) portfolioCurrent--;
            portfolioUpdate();
        });

        portfolioNext?.addEventListener('click', () => {
            const maxIndex = portfolioTotal - portfolioVisible();
            if (portfolioCurrent < maxIndex) portfolioCurrent++;
            portfolioUpdate();
        });

        portfolioUpdate();
        window.addEventListener('resize', portfolioUpdate);
    }


    // =========================================
    // PARTNERS SLIDER
    // =========================================

    const partnersTrack = document.querySelector('.partners__track');
    const partnersCards = partnersTrack?.querySelectorAll('.partners-card');
    const partnersPrev = document.querySelector('.partners__arrow_prev');
    const partnersNext = document.querySelector('.partners__arrow_next');
    const partnersNumber = document.querySelector('.partners__pagination-number');
    const partnersProgress = document.querySelector('.partners__pagination-progress');

    if (partnersTrack && partnersCards?.length) {
        let partnersCurrent = 0;
        const partnersTotal = partnersCards.length;

        function partnersUpdate() {
            const cardWidth = partnersCards[0].offsetWidth + 16;
            partnersTrack.style.transform = `translateX(-${partnersCurrent * cardWidth}px)`;
            partnersTrack.style.transition = 'transform 0.4s ease';

            const pages = partnersTotal;
            const current = partnersCurrent + 1;
            partnersNumber && (partnersNumber.textContent =
                `${String(current).padStart(2, '0')}/${String(pages).padStart(2, '0')}`);

            if (partnersProgress) {
                partnersProgress.style.width = `${(current / pages) * 100}%`;
            }
        }

        partnersPrev?.addEventListener('click', () => {
            if (partnersCurrent > 0) partnersCurrent--;
            partnersUpdate();
        });

        partnersNext?.addEventListener('click', () => {
            if (partnersCurrent < partnersTotal - 1) partnersCurrent++;
            partnersUpdate();
        });

        partnersUpdate();
    }

});