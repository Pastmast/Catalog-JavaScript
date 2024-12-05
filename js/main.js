import { initCities } from './components/cities.js';
import { initBurger } from './components/burger.js';
import { initAccordion } from './components/accordion.js';
import { initValidate } from './components/validate.js';
import { initBasket } from './components/basket.js';
import { getProductsData } from './api.js';
import { initCards } from './components/cards.js';
import { initSlider } from './components/slider.js';

window.addEventListener('DOMContentLoaded', async () => {
	const cardsData = await getProductsData();
	initCards(cardsData);
	initBurger();
	initBasket();
	initCities();
	initAccordion();
	initSlider(cardsData);
	initValidate();
});
