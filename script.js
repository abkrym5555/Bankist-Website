'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const section1 = document.querySelector('#section--1');
const navLinkss = document.querySelector('.nav__links');
const opTab = document.querySelectorAll('.operations__tab');
const opTabContainer = document.querySelector('.operations__tab-container');
const opTabContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navLogo = document.querySelector('.nav__logo');
const navLinks = document.querySelector('.nav__links');
const allSections = document.querySelectorAll('.section');
const lazImg = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

//go smooth
navLinkss.addEventListener('click', function (e) {
  e.preventDefault();
  const targetElem = e.target;
  const elmById = document.querySelector(targetElem.getAttribute('href'));
  if (targetElem.classList.contains('nav__link')) {
    elmById.scrollIntoView({ behavior: 'smooth' });
  }
});

// transation button
opTabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const activButt = e.target.closest('.operations__tab');

  if (!activButt) return;
  opTab.forEach(but => but.classList.remove('operations__tab--active'));
  opTabContent.forEach(con =>
    con.classList.remove('operations__content--active')
  );

  activButt.classList.add('operations__tab--active');
  document
    .querySelector(
      `.operations__content--${activButt.getAttribute('data-tab')}`
    )
    .classList.add('operations__content--active');
});

//nav hover
const handelrHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const activeHover = e.target;
    const siblings = activeHover.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(sib => {
      if (sib !== activeHover) sib.style.opacity = this;
    });
    navLogo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handelrHover.bind(0.5));
nav.addEventListener('mouseout', handelrHover.bind(1));

//stickey nav
const navHeight = nav.getBoundingClientRect().height;
const navObCallback = function (entreies, observer) {
  entreies.forEach(entrei => {
    entrei.isIntersecting
      ? nav.classList.remove('sticky')
      : nav.classList.add('sticky');
  });
};
const navObOprations = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const navObserver = new IntersectionObserver(navObCallback, navObOprations);
navObserver.observe(header);

//section load
const secCallback = function (entreies, observe) {
  entreies.forEach(entrei => {
    if (!entrei.isIntersecting) return;
    entrei.target.classList.remove('section--hidden');
    observe.unobserve(entrei.target);
  });
};
const secOpr = {
  root: null,
  threshold: 0,
};
const secObserver = new IntersectionObserver(secCallback, secOpr);
allSections.forEach(function (sec) {
  secObserver.observe(sec);
  sec.classList.add('section--hidden');
});

//img lazy
const imgCallback = function (entreies, observe) {
  entreies.forEach(entrei => {
    if (!entrei.isIntersecting) return;
    entrei.target.src = entrei.target.dataset.src;
    entrei.target.addEventListener('load', function (e) {
      entrei.target.classList.remove('lazy-img');
    });
    observe.unobserve(entrei.target);
  });
};
const imgOpr = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};
const imgObserv = new IntersectionObserver(imgCallback, imgOpr);
lazImg.forEach(img => {
  imgObserv.observe(img);
});

// Slider
const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
