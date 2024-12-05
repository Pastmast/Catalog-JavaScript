async function getProductsData() {
	const response = await fetch('./data/data.json');
	if (!response.ok) {
		throw new Error(`Ошибка получения данных: ${response.status}`);
	}
	const data = await response.json();
	return data;
}

export { getProductsData };
