const accordionBtns = document.querySelectorAll('.accordion__btn');

function toggleAccordion(activeBtn) {
	const isActive = activeBtn.classList.contains('accordion__btn--active');
	// Закрыть все аккордеоны
	accordionBtns.forEach((btn) => {
		btn.classList.remove('accordion__btn--active');
	});

	// Если текущая кнопка не активна, открыть её
	if (!isActive) {
		activeBtn.classList.add('accordion__btn--active');
	}
}

export const initAccordion = () => {
	accordionBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			toggleAccordion(btn);
		});
	});
};
