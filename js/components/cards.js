import { addProductToBasket } from './basket.js';

function initCards(cardsData) {
	const typeCount = {}; // Объект для хранения количества по типам

	cardsData.forEach((productData) => {
		// productData - это одна крточка
		// Увеличение счётчика для каждого типа
		productData.type.forEach((type) => {
			if (!typeCount[type]) {
				typeCount[type] = 0; // Если нет товаров с таким типом
			}
			typeCount[type]++;
		});

		const cardItem = createCard(productData);
		const li = document.createElement('li');
		li.classList.add('catalog__item');
		li.innerHTML = cardItem;
		const link = li.querySelector('[data-id]');
		link.addEventListener('click', (e) => {
			addProductToBasket(e, cardsData);
		});
		document.querySelector('.catalog__list').append(li);
	});
	// Обновляю количество рядом с чекбоксами
	updateFilterCounts(typeCount);
}

function updateFilterCounts(typeCount) {
	// Функция для отображения количества товаров
	const filtersLi = document.querySelectorAll('.catalog-form__item-col');

	filtersLi.forEach((li) => {
		const filterType = li.querySelector('input').value; // Получаю значение из чекбокса
		const count = typeCount[filterType] || 0; // Получаю количество или 0, если товара нет
		li.querySelector('.custom-checkbox__count').textContent = count; // Обновляю текст с количеством
	});
}

// Нахожу все чекбоксы и добавляю для них обработчик событий

document.querySelectorAll('.custom-checkbox__field').forEach((checkbox) => {
	checkbox.addEventListener('change', filterProductsByCheckbox);
});

// Создаю функцию filterProducts, которая будет проверять все карточки товаров и
// отображать только те, которые соответствуют выбранным фильтрам.

function filterProductsByCheckbox() {
	const selectedTypes = Array.from(document.querySelectorAll('.custom-checkbox__field:checked')).map(
		(checkbox) => checkbox.value
	);

	const productsLi = document.querySelectorAll('.catalog__item');

	// Если у нас ни один чекбокс не отмечен,то показываем все товары
	if (selectedTypes.length === 0) {
		productsLi.forEach((li) => (li.style.display = 'block'));
		return;
	}

	productsLi.forEach((li) => {
		const productCard = li.querySelector('.product-card');
		const productData = JSON.parse(productCard.dataset.product);

		const isTypeSelected = selectedTypes.some((type) => productData.type.includes(type));

		// Показать или скрыть карточку в зависимости от фильтров
		if (isTypeSelected) {
			li.style.display = 'block'; // Показываем элемент
		} else {
			li.style.display = 'none'; // Скрываем элемент
		}
	});
}

document.querySelectorAll('.custom-radio__field').forEach((radio) => {
	radio.addEventListener('change', filterProductsByRadio);
});

function filterProductsByRadio() {
	const selectedRadio = document.querySelector('.custom-radio__field:checked');

	const selectedCity = document.querySelector('.location__city').dataset.city;

	const productsLi = document.querySelectorAll('.catalog__item');

	if (selectedRadio.id === 'all-item') {
		productsLi.forEach((li) => (li.style.display = 'block'));
		return;
	}

	productsLi.forEach((li) => {
		const productCard = li.querySelector('.product-card');
		const productData = JSON.parse(productCard.dataset.product);
		if (productData.availability[selectedCity] > 0) {
			li.style.display = 'block';
		} else {
			li.style.display = 'none';
		}
	});
}

// Сортировка товаров

document.querySelector('.catalog__sort-select').addEventListener('change', sortProducts);

function sortProducts() {
	const selectedSort = document.querySelector('.catalog__sort-select').value;
	const productsLi = Array.from(document.querySelectorAll('.catalog__item'));

	if (selectedSort === 'price-min') {
		productsLi.sort((a, b) => {
			const priceA = JSON.parse(a.querySelector('.product-card').dataset.product).price.new;
			const priceB = JSON.parse(b.querySelector('.product-card').dataset.product).price.new;
			return priceA - priceB; // Сортировка по возрастанию
		});
	} else if (selectedSort === 'price-max') {
		productsLi.sort((a, b) => {
			const priceA = JSON.parse(a.querySelector('.product-card').dataset.product).price.new;
			const priceB = JSON.parse(b.querySelector('.product-card').dataset.product).price.new;
			return priceB - priceA; // Сортировка по убыванию
		});
	} else if (selectedSort === 'rating-max') {
		productsLi.sort((a, b) => {
			const ratingA = JSON.parse(a.querySelector('.product-card').dataset.product).rating;
			const ratingB = JSON.parse(b.querySelector('.product-card').dataset.product).rating;
			return ratingB - ratingA; // Сортировка по популярности
		});
	}

	// Очистка текущих карточек на странице и добавление отсортированных
	const catalogList = document.querySelector('.catalog__list');
	catalogList.innerHTML = ''; // Очистка списка карточек

	productsLi.forEach((li) => {
		catalogList.append(li); // Добавление карточек в отсортированном порядке
	});
}

function createCard(productData) {
	return `
                <div class="product-card" data-product='${JSON.stringify(productData)}'>
                  <div class="product-card__visual">
                    <img class="product-card__img" src="${
											productData.image
										}" height="436" width="290" alt="Изображение товара">
                    <div class="product-card__more">
                      <a href="#" class="product-card__link btn btn--icon" data-id="${productData.id}">
                        <span class="btn__text">В корзину</span>
                        <svg width="24" height="24" aria-hidden="true">
                          <use xlink:href="images/sprite.svg#icon-basket"></use>
                        </svg>
                      </a>
                      <a href="#" class="product-card__link btn btn--secondary">
                        <span class="btn__text">Подробнее</span>
                      </a>
                    </div>
                  </div>
                  <div class="product-card__info">
                    <h2 class="product-card__title">${productData.name}</h2>
                    <span class="product-card__old">
                      <span class="product-card__old-number">${productData.price.old.toLocaleString('ru-RU')}</span>
                      <span class="product-card__old-add">₽</span>
                    </span>
                    <span class="product-card__price">
                      <span class="product-card__price-number">${productData.price.new.toLocaleString('ru-RU')}</span>
                      <span class="product-card__price-add">₽</span>
                    </span>
                    <div class="product-card__tooltip tooltip">
                      <button class="tooltip__btn" aria-label="Показать подсказку">
                        <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                          <use xlink:href="images/sprite.svg#icon-i"></use>
                        </svg>
                      </button>
                      <div class="tooltip__content">
                        <span class="tooltip__text">Наличие товара по городам:</span>
                        <ul class="tooltip__list">
                          <li class="tooltip__item">
                            <span class="tooltip__text">Москва: <span class="tooltip__count">${
															productData.availability.moscow
														}</span></span>
                          </li>
                          <li class="tooltip__item">
                            <span class="tooltip__text">Оренбург: <span class="tooltip__count">${
															productData.availability.orenburg
														}</span></span>
                          </li>
                          <li class="tooltip__item">
                            <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${
															productData.availability.saintPetersburg
														}</span></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
  `;
}

export { initCards };
