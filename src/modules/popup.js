import { addcomment, fetchcomment } from './commet.js';
//* ----------------API-Fetch Function-----------//

const overlay = document.querySelector('#popup');
function createModal(item) {
  const sampleTemplateModal = `
  <div class="modal-work">
      <div class="Imgname">
        <i class="fa fa-close data-close-button"></i>  
      </div>
     <div class="item-info">
        <img src="${item.image.original}" alt="" class="main-img">
        <h2 class="item-name">${item.name}</h2>
          <div class="info1">
          ${item.summary} 
        </div>
        <div class="info2">
          <h2>Air date:${item.airdate} </h2>
          <h2>Air time:${item.airtime} </h2>
        </div>
      </div>
 <h2 class="comments-title">comment( 0 )</h2>
 <ul class="comment-list">
 </ul>
 <form>
        <input type="text" name="name" class="username"  placeholder="Your name" required/>
        <textarea  name="message" class="message" rows="6" maxlength="50" placeholder="Enter your comment here..." required></textarea>
        <button type="submit" class="btn add-commet" id="${item.id}">Comment</button>
</form>
</div>
`;

  return sampleTemplateModal;
}

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}
const buttonEventListener = async (id) => {
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/1/episodebynumber?season=1&number=${id}`);
    if (res.status !== 200) throw new Error('Error fetching data');
    const data = await res.json();
    const modal = createModal(data);
    const element = document.createElement('div');
    element.innerHTML = modal;
    element.classList.add('modal');
    const addElement = document.getElementById('popup');
    addElement.after(element);
    openModal(element);
    fetchcomment(id);
    const addCommet = document.querySelectorAll('.add-commet');
    addCommet.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const username = document.querySelector('.username').value;
        const comment = document.querySelector('.message').value;
        const itemid = e.target.id;
        addcomment(itemid, username, comment).then((res) => {
          if (res.ok) {
            fetchcomment(id);
            document.querySelector('form').reset();
          }
        });
      });
    });

    const closePopButtons = document.querySelectorAll('.data-close-button');
    closePopButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
      });
    });
    return res;
  } catch (err) {
    return err;
  }
};

export default buttonEventListener;
