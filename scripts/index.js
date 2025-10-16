const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#edit-profile-name");
const descriptionInput = editProfileModal.querySelector("#edit-profile-description");

const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewCloseBtnElement = previewModal.querySelector(".modal__close-btn");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewNameElement = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  const cardLikeBtnElement = cardElement.querySelector(".card__like-btn");
  cardLikeBtnElement.addEventListener("click", () => {
    cardLikeBtnElement.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnElement = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnElement.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewImageElement.src = data.link;
    previewImageElement.alt = data.name;
    previewNameElement.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openModal = document.querySelector('.modal_is-opened');
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  document.addEventListener('keydown', handleEscape);
  modal.addEventListener('click', handleOverlayclick);

}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  document.removeEventListener('keydown', handleEscape);
  modal.removeEventListener('click', handleOverlayclick);
}

editProfileBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileJobElement.textContent;
  openModal(editProfileModal);
});

function handleOverlayclick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}


editProfileCloseBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal(editProfileModal);
});

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

newPostBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal(newPostModal);
});

previewCloseBtnElement.addEventListener("click", (evt) => {
  evt.preventDefault();
  closeModal(previewModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = descriptionInput.value;

  closeModal(editProfileModal);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#card-link-input");
const captionInput = newPostModal.querySelector("#card-caption-input");
const cardSubmitBtn = newPostModal.querySelector(".modal__save-btn");

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: captionInput.value,
    link: linkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  evt.target.reset();
  disableButton(cardSubmitBtn, settings);

  closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
