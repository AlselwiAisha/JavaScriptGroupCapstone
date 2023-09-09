import buttonEventListener from './popup.js';
import { addLike } from './Likes.js';
import { mainApi } from './apiLinks.js';

const displayList = async () => {
  const contentContainer = document.getElementById('content-container');

  const response = await fetch(mainApi);
  const episodeData = await response.json();

  episodeData.forEach((episode) => {
    const list = document.createElement('li');
    list.id = episode.id;

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');
    list.appendChild(imgContainer);

    const img = document.createElement('img');
    img.src = episode.image.medium;
    img.alt = 'episode banner';
    img.classList.add('image');
    imgContainer.appendChild(img);

    const container = document.createElement('div');
    container.classList.add('title-like-container');
    list.appendChild(container);

    const title = document.createElement('div');
    title.classList.add('episode-title');
    title.textContent = `${episode.name}`;
    container.appendChild(title);

    const subContainer = document.createElement('div');
    subContainer.classList.add('sub-container');
    container.appendChild(subContainer);

    const like = document.createElement('div');
    like.classList.add('like');
    like.id = episode.id;
    like.innerHTML = '&hearts;';
    subContainer.appendChild(like);

    const likeCount = document.createElement('div');
    likeCount.classList.add('like-count');
    likeCount.innerHTML = 0;
    subContainer.appendChild(likeCount);

    const commentBTN = document.createElement('button');
    commentBTN.classList.add('comment-button');
    commentBTN.textContent = 'Comments';
    commentBTN.type = 'button';
    list.appendChild(commentBTN);

    contentContainer.appendChild(list);
  });
  const listItems = contentContainer.querySelectorAll('li');
  const menuList = document.querySelectorAll('.menu-list');
  const likeEle = document.querySelectorAll('.like');
  const openPopButtons = document.querySelectorAll('.comment-button');
  const listCounter = document.createElement('span');
  listCounter.textContent = `(${listItems.length})`;
  menuList[0].appendChild(listCounter);

  openPopButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      buttonEventListener(e.target.parentElement.id);
    });
  });

  likeEle.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const likeID = e.target.id;
      const likeCount = e.target.nextElementSibling;
      if (e.target.classList.contains('like')) {
        const res = await addLike(likeID);
        const value = parseInt(likeCount.textContent, 10);
        e.target.classList.add('like2');
        e.target.classList.remove('like');
        if (res.status === 201) {
          likeCount.innerHTML = value + 1;
        }
      }
    });
  });
};

export default displayList;