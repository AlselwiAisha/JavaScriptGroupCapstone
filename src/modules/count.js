import { mainApi } from './apiLinks.js';

const commentsCount = () => {
  const comments = document.querySelectorAll('.comments');
  return comments.length;
};

const itemsCount = async () => {
  const data = await fetch(mainApi);
  const json = await data.json();
  return json;
};
export { commentsCount, itemsCount };