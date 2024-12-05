import * as storage from './storage.js';

const basketBtn = document.querySelector('.header__user-btn');
const basketMenu = document.querySelector('.header__basket');

function initBasket() {
	basketBtn.addEventListener('click', toggleBasket);
	// Вызов функции рендеринга корзины при загрузке
	renderBasket();
	updateBasketCount();
}

function toggleBasket() {
	basketMenu.classList.toggle('basket--active');
	renderBasket();
}

document.addEventListener('click', (event) => {
	event.stopPropagation();
	if (!basketBtn.contains(event.target) && !basketMenu.contains(event.target)) {
		basketMenu.classList.remove('basket--active');
	}
});

// Обработчик событий для добавления товара в корзину

function addProductToBasket(e, cardsData) {
	const productId = e.target.dataset.id;
	const productData = cardsData.find((product) => {
		return product.id === +productId; // пишу "+" чтобы привести productId - строку в число
	});
	if (productData) {
		storage.addObjectToLocalStorage(productData); // Добавляю в локальное хранилище
		updateBasketCount(); // Обновляю счётчик
		renderBasketItem(productData); // Отрисовываю товар в корзине
	}
}

// функция, которая обновляет счётчик товаров в корзине

function updateBasketCount() {
	const count = storage.getAllObjectsLocalStorage().length;
	const userCountElement = document.querySelector('.header__user-count');

	if (count === 0) {
		userCountElement.textContent = 0; // Обновляю текст счётчика
	} else {
		userCountElement.textContent = count; // Убираю цифры, если корзина пустая
	}
}

// Функция по отрисовке добавленного товара в корзину

function renderBasketItem(productData) {
	const basketList = document.querySelector('.basket__list');
	const basketItem = document.createElement('li');
	basketItem.classList.add('basket__item');
	basketItem.innerHTML = `
		<div class="basket__img">
			<img src="${productData.image}" alt="Фотография товара" height="60" width="60">
		</div>
		<span class="basket__name">${productData.name}</span>
		<span class="basket__price">${productData.price.new.toLocaleString('ru-RU')} руб</span>
		<button class="basket__close" type="button" data-id="${productData.id}">
			<svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
				<use xlink:href="images/sprite.svg#icon-close"></use>
			</svg>
		</button>
	`;
	basketList.append(basketItem);

	updateEmptyBasketDisplay(); // Обновить состояние пустой корзины

	// Добавить обработчик для кнопки удаления

	basketItem.querySelector('.basket__close').addEventListener('click', (e) => {
		e.stopPropagation();
		removeBasketItem(productData.id); // Удаляем товар в корзине по ID
	});
}

// Функция удаления товара из корзины

function removeBasketItem(productId) {
	const objects = storage.getAllObjectsLocalStorage();
	const newObjects = objects.filter((item) => item.id !== parseInt(productId));
	localStorage.setItem('objects', JSON.stringify(newObjects));
	updateBasketCount(); // Обновляем счетчик
	renderBasket(); // Перерисовываем корзину
}

// Функция отрисовки всех товаров в корзине

function renderBasket() {
	const basketList = document.querySelector('.basket__list');
	basketList.innerHTML = ''; // Очистка текущих товаров

	const objects = storage.getAllObjectsLocalStorage();
	objects.forEach((productData) => {
		renderBasketItem(productData); // Отрисовка каждого товара
	});
	updateOrderBtn(); // Функция отображения кнопки оформления заказа
	updateEmptyBasketDisplay(); // Проверяем, пустая ли корзина
}

function updateEmptyBasketDisplay() {
	const basketEmptyBlock = document.querySelector('.basket__empty-block');
	const itemsInBasket = storage.getAllObjectsLocalStorage().length;

	if (itemsInBasket > 0) {
		basketEmptyBlock.style.display = 'none'; // Скрыть блок о пустой корзине
	} else {
		basketEmptyBlock.style.display = ''; // Показать блок о пустой корзине
	}
}

// Функция отображения кнопки оформления заказа

function updateOrderBtn() {
	const btn = document.querySelector('.basket__link');
	const itemsInBasket = storage.getAllObjectsLocalStorage().length;

	if (itemsInBasket > 0) {
		btn.style.display = 'flex'; // Показать кнопку о оформлении заказа
	} else {
		btn.style.display = 'none'; // Скрыть кнопку о оформлении заказа
	}
}

export { initBasket, addProductToBasket };
