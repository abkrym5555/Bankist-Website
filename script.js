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

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

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

navLinkss.addEventListener('click', function (e) {
  e.preventDefault();
  const targetElem = e.target;
  const elmById = document.querySelector(targetElem.getAttribute('href'));
  if (targetElem.classList.contains('nav__link')) {
    elmById.scrollIntoView({ behavior: 'smooth' });
  }
});

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
