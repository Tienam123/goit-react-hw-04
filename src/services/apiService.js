import axios from "axios";

const API_KEY_UNSPLASH = 'DpHeLCf8Myf-ctad09x85yFdS8xRIxlglgRermDkhpQ'
const API_KEY_PIXABAY = '41512134-7ce1694d07a59eb7d39c787c8';
// const urlPixabay = `https://pixabay.com/api/?key=${API_KEY_PIXABAY}&q=${query}&image_type=photo&orientation=horisontal&safesearch=true&per_page=15&page=${page}`;
// const urlUnsplash = `https://api.unsplash.com/search/photos?client_id=DpHeLCf8Myf-ctad09x85yFdS8xRIxlglgRermDkhpQ&query=${query}&page=${page}&per_page=20`

export const getImagesPixabay = async (query, page) => {
    const urlUnsplash = `https://api.unsplash.com/search/photos?client_id=${API_KEY_UNSPLASH}&query=${query}&page=${page}&per_page=20`

    const data = await axios.get(urlUnsplash)
    return data.data
}