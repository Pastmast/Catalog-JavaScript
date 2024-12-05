const validation = new JustValidate('.questions__form');

function initValidate() {
	validation
		.addField('#name', [
			{
				rule: 'required',
				errorMessage: 'Пожалуйста, введите ваше имя',
			},
			{
				rule: 'minLength',
				value: 3,
				errorMessage: 'Имя должно содержать минимум 3 символа',
			},
			{
				rule: 'maxLength',
				value: 20,
				errorMessage: 'Имя должно содержать максимум 20 символов',
			},
		])
		.addField('#email', [
			{
				rule: 'required',
				errorMessage: 'Пожалуйста, введите вашу почту',
			},
			{
				rule: 'email',
				errorMessage: 'Введите корректный email',
			},
		])
		.addField('#agree', [
			{
				rule: 'required',
				errorMessage: 'Вы должны согласиться на обработку данных',
			},
		])
		.onSuccess(async (event) => {
			event.preventDefault();

			const formData = new FormData(event.target);

			try {
				const response = await fetch('https://httpbin.org/post', {
					method: 'POST',
					body: formData,
				});
				document.getElementById('name').value = '';
				document.getElementById('email').value = '';
				document.getElementById('agree').checked = false;
				if (!response.ok) {
					throw new Error('Ошибка при отправке данных');
				}
				showModal('Благодарим за обращение!');
			} catch (error) {
				showModal('Не удалось отправить сообщение');
			}
		});
}

// Функция для отображения модального окна
function showModal(title) {
	const modal = document.createElement('div');
	modal.className = 'message';
	modal.innerHTML = `
    <div class="message__content">
      <button class="message__close">&times;</button>
      <h2>${title}</h2>
    </div>
  `;

	document.body.appendChild(modal);

	// Закрытие модального окна
	modal.querySelector('.message__close').addEventListener('click', () => {
		modal.remove();
	});

	// Закрытие модального окна при клике вне его
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.remove();
		}
	});
}

export { initValidate };
