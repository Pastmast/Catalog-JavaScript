// Добавление объекта в корзину
const addObjectToLocalStorage = (object) => {
	const objects = JSON.parse(localStorage.getItem('objects')) || [];
	objects.push(object);
	localStorage.setItem('objects', JSON.stringify(objects));
};

// Удаление объекта из корзины

const deleteObjectByIndexFromLocalStorage = (index) => {
	const objects = JSON.parse(localStorage.getItem('objects')) || [];
	objects.splice(index, 1);
	localStorage.setItem('objects', JSON.stringify(objects));
};

// Получение всех объектов

function getAllObjectsLocalStorage() {
	const objects = JSON.parse(localStorage.getItem('objects')) || [];
	return objects;
}

export { addObjectToLocalStorage, deleteObjectByIndexFromLocalStorage, getAllObjectsLocalStorage };
