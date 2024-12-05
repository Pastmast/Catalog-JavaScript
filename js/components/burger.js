// Действия с бургером

const burgerBtn = document.querySelector('.header__catalog-btn');
const closeBurgerMenu = document.querySelector('.main-menu__close');
const mainMenu = document.querySelector('.main-menu');

function burgerActive() {
	mainMenu.classList.add('main-menu--active');
}

function burgerClose() {
	mainMenu.classList.remove('main-menu--active');
}

function initBurger() {
	burgerBtn.addEventListener('click', burgerActive);
	closeBurgerMenu.addEventListener('click', burgerClose);
}

export { initBurger };
