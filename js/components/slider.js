function initSlider(cardsData) {
	// cardsData - это массив с карточками
	// cardData - это одна крточка
	const goodsOfTheDay = cardsData.filter((card) => card.goodsOfDay === true); // Отбираю только товары дня
	const dayProductsList = document.querySelector('.day-products__list');

	goodsOfTheDay.forEach((cardData) => {
		const cardItem = createCard(cardData);
		const li = document.createElement('li');
		li.classList.add('day-products__item', 'swiper-slide');
		li.innerHTML = cardItem;
		dayProductsList.append(li);
	});
	setSlider(); // Инициализация слайдера
}

function createCard(cardData) {
	return `
                <div class="product-card product-card--small">
                <div class="product-card__visual">
                  <img class="product-card__img" src="${
										cardData.image
									}" height="344" width="290" alt="Изображение товара">
                  <div class="product-card__more">
                    <a href="#" class="product-card__link btn btn--icon">
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
                  <h2 class="product-card__title">${cardData.name}</h2>
                  <span class="product-card__old">
                    <span class="product-card__old-number">${cardData.price.old.toLocaleString('ru-RU')}</span>
                    <span class="product-card__old-add">₽</span>
                  </span>
                  <span class="product-card__price">
                    <span class="product-card__price-number">${cardData.price.new.toLocaleString('ru-RU')}</span>
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
														cardData.availability.moscow
													}</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Оренбург: <span class="tooltip__count">${
														cardData.availability.orenburg
													}</span></span>
                        </li>
                        <li class="tooltip__item">
                          <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${
														cardData.availability.saintPetersburg
													}</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
  `;
}

function setSlider() {
	const swiper = new Swiper('.day-products__slider', {
		navigation: {
			nextEl: '.day-products__navigation-btn--next',
			prevEl: '.day-products__navigation-btn--prev',
		},
		spaceBetween: 20, // Отступы между слайдами
		slidesPerView: 4, // Количество видимых слайдов
	});
}

export { initSlider };
