const addPopUpToMoviesDiv = () => {
  const popUpPart = document.getElementById('popUp');
  popUpPart.innerHTML = `
  <div class="modal fade modal-dialog-scrollable" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" data-static>
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="text-center" id="staticBackdropLabel">Movie Information</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4 d-flex flex-column align-items-center">
          <p id="popUpMovieId" class="align-self-start"></p>
          <div class="row">
            <div class="col-6" id="popUpPoster"></div>
            <div class="col-6 pt-5">
              <h2 class="text-center h2 mt-5" id="popUpMovieTitle"></h2>
              <p class="d-none" id="popUpMovieDescription"></p>
            </div>
          </div>
          <div id="userDetailDiv">
            <a class="btn mt-3 mb-3" data-toggle="collapse" href="#popUpMovieComments" role="button" aria-expanded="false"
              aria-controls="popUpMovieComments" id="movieDetailCounter">
            </a>
            <div class="collapse d-flex flex-column align-self-start w-100 p-3 comments-div" id="popUpMovieDetail">
            </div>
          </div>
        </div>
        <form id="popUpForm" class="p-4">
          <div class="form-group">
            <label for="user-name" class="col-form-label">Enter your name:</label>
            <input type="text" class="form-control" id="user-name">
          </div>
          <div class="form-group d-none" id="userCommentDiv">
            <label for="user-comment" class="col-form-label">Your comments:</label>
            <textarea class="form-control" id="user-comment"></textarea>
          </div>
          <div class="form-group d-none" id="reservationStartDateDiv">
            <label for="reservationStartDate" class="col-form-label">Date start:</label>
            <textarea class="form-control" id="reservationStartDate"></textarea>
          </div>
          <div class="form-group d-none" id="reservationEndDateDiv">
            <label for="reservationEndDate" class="col-form-label">Date end:</label>
            <textarea class="form-control" id="reservationEndDate"></textarea>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-dark">Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
};

export { addPopUpToMoviesDiv }; // eslint-disable-line import/prefer-default-export
