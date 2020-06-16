import axios from "axios";

const myKey = "16289241-4573a8dd8ec62d75602da9e3c";

function fetchPicturesByQuery(query, page) {
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&key=${myKey}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    )
    .then((response) => response.data.hits);
}

export default {
  fetchPicturesByQuery,
};
