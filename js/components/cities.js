// Действия с выбором города

const cityButton = document.querySelector('.location__city');
const cityName = document.querySelector('.location__city-name');
const sublist = document.querySelector('.location__sublist');
const sublinks = document.querySelectorAll('.location__sublink');

cityButton.dataset.city = 'orenburg';

function initCities() {
	cityButton.addEventListener('click', () => {
		cityButton.classList.toggle('location__city--active');
	});

	sublinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			const selectedCity = event.target.innerText;
			cityName.innerText = selectedCity;
			if (selectedCity.toLowerCase() === 'оренбург') {
				cityButton.dataset.city = 'orenburg';
			}
			if (selectedCity.toLowerCase() === 'москва') {
				cityButton.dataset.city = 'moscow';
			}
			if (selectedCity.toLowerCase() === 'санкт-петербург') {
				cityButton.dataset.city = 'saintPetersburg';
			}
			cityButton.classList.remove('location__city--active');
		});
	});

	document.addEventListener('click', (event) => {
		if (!cityButton.contains(event.target) && !sublist.contains(event.target)) {
			cityButton.classList.remove('location__city--active');
		}
	});
}

export { initCities };
