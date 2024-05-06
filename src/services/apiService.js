import axios from "axios";

const API_KEY = '41512134-7ce1694d07a59eb7d39c787c8';


export const getImagesPixabay = async (query, page) => {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horisontal&safesearch=true&per_page=15&page=${page}`;
    try {
        const data = await axios.get(url)
        return data.data
    }
    catch (error) {
        if (error.response) {
            // Ошибка при получении ответа с кодом состояния, отличным от 2xx
            console.error('Ошибка получения данных:', error.response.status);
        } else if (error.request) {
            // Ошибка при отправке запроса
            console.error('Ошибка отправки запроса:', error.request);
        } else {
            // Ошибка при настройке запроса
            console.error('Ошибка настройки запроса:', error.message);
        }
    }

}