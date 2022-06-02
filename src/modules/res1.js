import {APP_ID, INVOLVEMENT, RESERVATION_ENDPOINT} from "./apiHelper";

const postURL = `${INVOLVEMENT}/${APP_ID}/${RESERVATION_ENDPOINT}/`;

// const commentsHeader = document.querySelector('.comments-container h4');
// const spinner = document.querySelector('#comments-spinner');

const getReservations = async (id) => {
  commentsHeader.innerHTML = 'Comments (0)';
  spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  await fetch(`${INVOLVEMENT}/${APP_ID}/${RESERVATION_ENDPOINT}?item_id=${id}`)
    .then((reponse) => reponse.json())
    .then((json) => {
      spinner.innerHTML = '';
      commentsCounter(json, commentsHeader);
      const commentsList = document.querySelector('.comment');
      commentsList.innerHTML = '';
      json.forEach((comment) => {
        const newComment = document.createElement('li');
        newComment.innerHTML = `<span class="date">${comment.creation_date}</span><span class="name">${comment.username}:</span> <span
              class="comment-text">${comment.comment}</span>`;
        commentsList.appendChild(newComment);
      });
    });
};

const postComment = async (username, comment, id) => {
  await fetch(`${postURL}${appID}/comments/`, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(() => {
    getComments(id);
  });
};

export { postComment, getComments };