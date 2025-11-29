import Swiper from 'swiper/bundle';

export function initSlider() {
    const slider = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            addIcons: false,
        },
        slidesPerView: 1,
        spaceBetween: 0,
    });

    return slider;
}

