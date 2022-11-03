const postData = async (url, data) => {    // отдельный метод для запроса на сервер
    const res = await fetch(url, {
        method: "POST",
        headers:{'Content-type': 'application/json'}, // эта строчка нужна для json, для formData не нужна
        body: data
    });

    return await res.json(); // эта строка тоже возвращает промис так как потом мы ее обрабатываем при помощи then
}

const getResource = async (url) => {    // отдельный метод для запроса на сервер
    const res = await fetch(url);
    if(!res.ok){  // так делаем потому что ошибка 404 для fetch не является ошиькой и он не попадет в метод catch
        throw new Error(`Ошибка получения данных с сервера ${url}, status: ${res.status}`); 
    }

    return await res.json(); // эта строка тоже возвращает промис так как потом мы ее обрабатываем при помощи then
}


// axios.get('http://localhost:3000/menu') // библиотека axios // этот код делает тоже самое что и getResource
// .then(data => {
//     data.data.forEach(({img, altimg, title, descr, price}) => {
//         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//     });
// });

export {postData};
export {getResource};