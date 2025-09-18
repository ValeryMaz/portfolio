import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', () => {
  const swiperContainer = document.querySelector('.swiper-projects');
  if (!swiperContainer) {
    console.error('Swiper container not found');
    return;
  }

  const swiperPrj = new Swiper('.swiper-projects', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    speed: 800,

    modules: [Navigation, Keyboard],

    navigation: {
      nextEl: '.next-button-js-prj',
      prevEl: '.prev-button-js-prj',
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    breakpoints: {
      768: {
        direction: 'horizontal',
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1440: {
        direction: 'horizontal',
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },

    on: {
      init() {
        console.log('Swiper initialized');
      },

      slideChange() {
        console.log('Active slide:', this.activeIndex + 1);
      },

      beforeResize() {
        this.update();
      },
    },
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      swiperPrj.update();
    }, 150);
  });
});
