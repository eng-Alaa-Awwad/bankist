'use strict';

///////////////////////////////////////
//******* Modal window *******//
// ^Step[1]:Select Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// ^Step[2]:Define Open & Close Funtion
const openModal = function (e) {
  e.preventDefault(); //To Privent The page scrolling to top when click the button
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// ^Step[3]:Add Open & Close Funtions To buttons
// --> Open Buttons <--
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// --> Closed Merhods<--
// !Method [1]:Click Button
btnCloseModal.addEventListener('click', closeModal);
// !Method [2]:Click on OverLay
overlay.addEventListener('click', closeModal);
// !Method [3]:Press Esc key in Keybord
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////
//******* Smoth Scrolling *******//

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////
//******* Page navigation somthly (event delegation)*******//

const navLinks = document.querySelector('.nav__links');

navLinks.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});
///////////////////////////////////////
//******* nav feadOut anmation*******//
const nav = document.querySelector('nav');
const navLink = document.querySelectorAll('.nav__link');
function handelFead(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    navLink.forEach(ele => (ele.style.opacity = opacity));
    e.target.style.opacity = 1;
  }
}
nav.addEventListener('mouseover', function (e) {
  handelFead(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handelFead(e, 1);
});

///////////////////////////////////////
//******* sticky  nav (old way)*******//
// const initcordenat = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY >= initcordenat.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
//******* sticky  nav (new way)*******//
const header = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
headerObserver.observe(header);

//*******Revealing Elements on Scroll*******//
const allSections = document.querySelectorAll('.section');
const sectionReveal = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};
const sectionObs = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObs.observe(section);
  section.classList.add('section--hidden');
});
//*******Lazy image Loding*******//
const allImages = document.querySelectorAll('img[data-src]');
const lazyLoad = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observe.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
allImages.forEach(function (image) {
  imageObserver.observe(image);
});

///////////////////////////////////////
//******* Tapped Component (event delegation)*******//
const tabContainer = document.querySelector('.operations__tab-container');
const allTap = document.querySelectorAll('.operations__tab');
const tapContaint = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const Clicked = e.target.closest('.operations__tab');
  // we use closest method to handel the click on the span contian number insisd each tab button
  // guard clause
  if (!Clicked) return;
  if (Clicked.classList.contains('operations__tab')) {
    const clickedTabNum = +Clicked.dataset.tab;

    // [1]deactivat all btns tab
    allTap.forEach(btn => btn.classList.remove('operations__tab--active'));
    // [2]add active tab class to selected btn
    Clicked.classList.add('operations__tab--active');

    // [hidden all tabs container]
    tapContaint.forEach(btn =>
      btn.classList.remove('operations__content--active')
    );
    // [diplay contant for selected tab]

    document
      .querySelector(`.operations__content--${clickedTabNum}`)
      .classList.add('operations__content--active');
  }
});
//*******Slider*******//
// !Variables
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');
const CreateDots = function () {
  for (let i = 0; i < slides.length; i++) {
    const html = `<button class="dots__dot" data-slide=${i}></button>`;
    dotsContainer.insertAdjacentHTML('beforeend', html);
  }
};
const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(e => e.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
function init() {
  goToSlide(0);
  CreateDots();
  activeDot(0);
}

let currentSlide = 0;
// !Functions
const goToSlide = function (x) {
  slides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${100 * (i - x)}%)`)
  );
};
const nextSlide = function () {
  currentSlide++;
  if (currentSlide === slides.length) currentSlide = 0;
  goToSlide(currentSlide);
  activeDot(currentSlide);
};
const previousSlide = function () {
  currentSlide--;
  if (currentSlide === -1) currentSlide = slides.length - 1;
  goToSlide(currentSlide);
  activeDot(currentSlide);
};
// !main Logic
init();
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
  if (e.key === 'ArrowLeft') {
    previousSlide();
  }
});
dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    activeDot(slide);
    goToSlide(slide);
  }
});
