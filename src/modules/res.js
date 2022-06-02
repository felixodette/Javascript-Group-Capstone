import { postComment, getComments } from './comments.js';

const modal = document.querySelector('.comment-modal');
const modalImg = document.querySelector('.popup-image img');
const modalTitle = document.querySelector('.item-info h3');
const modalRecipe = document.querySelector('.recipe');
const closeBtn = document.querySelector('.close-btn');
const formContainer = document.querySelector('.add-comment');

const baseURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const createForm = (id) => {
  formContainer.innerHTML = '<h4>Make Reservation</h4>';
  const formDIV = document.createElement('div');
  formDIV.classList.add('form-section text-dark');
  formDIV.id = id;
  formDIV.innerHTML = `<!-- Reservation form -->
              <form class="form-floating">
                <input type="text" class="form-control" id="floatingInputInvalid" placeholder="name@example.com" value="" data-name>
                <label for="floatingInputInvalid">Name</label>
              </form>
              <form class="form-floating">
                <input type="text" class="form-control" placeholder="name@example.com" value="" data-start>
                <label for="floatingInputInvalid">Start</label>
              </form>
              <form class="form-floating">
                <input type="text" class="form-control" placeholder="name@example.com" value="" data-end>
                <label for="floatingInputInvalid">End</label>
              </form>
              <button type="submit" class="btn btn-primary">Reserve</button>`;
  formContainer.appendChild(formDIV);
  const username = document.querySelector('[data-name]');
  const date_start = document.querySelector('[data-start]');
  const date_end = document.querySelector('[data-end]');
  formDIV.addEventListener('submit', (e) => {
    e.preventDefault();
    if (username.value && date_start.value && date_end) {
      postComment(name.value, comment.value, form.id);
      form.reset();
    }
  });
};

const displayPopup = () => {
  const commentBtns = document.querySelectorAll('.comments-btn');

  commentBtns.forEach((button) => {
    button.addEventListener('click', () => {
      createForm(button.id);
      getComments(button.id);

      fetch(`${baseURL}${button.id}`)
        .then((response) => response.json())
        .then((json) => {
          modal.classList.add('active');
          document.querySelector('body').classList.add('no-scroll');
          modalImg.setAttribute('src', json.meals[0].strMealThumb);
          modalTitle.innerHTML = json.meals[0].strMeal;
          modalRecipe.innerHTML = json.meals[0].strInstructions;
        });
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.querySelector('body').classList.remove('no-scroll');
  });
};

export default displayPopup;