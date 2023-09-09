import { likeApi } from './apiLinks.js';

const addLike = async (index) => {
  try {
    const response = await fetch(likeApi, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: index,
      }),
    });

    return response;
  } catch (error) {
    return error;
  }
};

const getLike = async () => {
  try {
    const response = await fetch(likeApi);
    const likesdata = await response.json();

    const likeElements = document.querySelectorAll('.like');
    likesdata.forEach((item) => {
      likeElements.forEach((arrItem) => {
        const idItem = arrItem.id;
        if (idItem === item.item_id) {
          arrItem.nextSibling.innerHTML = item.likes;
        }
      });
    });
    return response;
  } catch (error) {
    return error;
  }
};

export { addLike, getLike };