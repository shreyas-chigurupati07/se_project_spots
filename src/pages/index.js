import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
import "./index.css";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "14f5d8b0-836a-4344-a24a-74af9df65553",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((item) => {
      const cardEl = getCardElement(item);
      cardsList.append(cardEl);
    });

    profileAvatarElement.src = user.avatar;

    profileNameElement.textContent = user.name;
    profileJobElement.textContent = user.about;
  })
  .catch((err) => {
    console.error(err);
  });

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const nameInput = editProfileModal.querySelector("#edit-profile-name");
const descriptionInput = editProfileModal.querySelector(
  "#edit-profile-description",
);
const editProfileSubmitBtn = editProfileModal.querySelector(".modal__save-btn");

const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");
const profileAvatarElement = document.querySelector(".profile__avatar");

const previewModal = document.querySelector("#preview-modal");
const previewCloseBtnElement = previewModal.querySelector(".modal__close-btn");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewNameElement = previewModal.querySelector(".modal__caption");

const deleteConfirmationModal = document.querySelector(
  "#delete-confirmation-modal",
);
const deleteConfirmationCloseBtn =
  deleteConfirmationModal.querySelector(".modal__close-btn");
const deleteConfirmationDeleteBtn = deleteConfirmationModal.querySelector(
  ".modal__delete-confirmation-btn",
);
const deleteConfirmationCancelBtn = deleteConfirmationModal.querySelector(
  ".modal__cancel-confirmation-btn",
);

const editAvatarBtn = document.querySelector(".profile__avatar-edit-btn");
const editAvatarContainerBtn = document.querySelector(
  ".profile__avatar-container",
);
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  if (data && data._id) {
    cardElement.dataset.id = data._id;
  }
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  const cardLikeBtnElement = cardElement.querySelector(".card__like-btn");

  cardLikeBtnElement.addEventListener("click", () => {
    selectedCardId = data._id;

    const isCurrentlyLiked = cardLikeBtnElement.classList.contains(
      "card__like-btn_active",
    );

    api
      .likeCard(selectedCardId, isCurrentlyLiked)
      .then((data) => {
        cardLikeBtnElement.classList.toggle("card__like-btn_active");
      })
      .catch((err) => {
        console.error(err);
      });
  });

  const cardDeleteBtnElement = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnElement.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data),
  );

  cardImageElement.addEventListener("click", () => {
    previewImageElement.src = data.link;
    previewImageElement.alt = data.name;
    previewNameElement.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteConfirmationModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  setButtonText(deleteConfirmationDeleteBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteConfirmationModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(
        deleteConfirmationDeleteBtn,
        false,
        "Delete",
        "Deleting...",
      );
    });
}

deleteConfirmationCloseBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeModal(deleteConfirmationModal);
});

deleteConfirmationCancelBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  closeModal(deleteConfirmationModal);
});

deleteConfirmationDeleteBtn.addEventListener("click", handleDeleteSubmit);

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("click", handleOverlayclick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("click", handleOverlayclick);
}

editProfileBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileJobElement.textContent;
  resetValidation(profileFormElement, [nameInput, descriptionInput], settings);
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
  setButtonText(editProfileSubmitBtn, true);
  api
    .editUserInfo({ name: nameInput.value, about: descriptionInput.value })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileJobElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(editProfileSubmitBtn, false);
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#card-link-input");
const captionInput = newPostModal.querySelector("#card-caption-input");
const cardSubmitBtn = newPostModal.querySelector(".modal__save-btn");

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  setButtonText(cardSubmitBtn, true);
  api
    .addNewCard({ name: captionInput.value, link: linkInput.value })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);

      evt.target.reset();
      disableButton(cardSubmitBtn, settings);

      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(cardSubmitBtn, false);
    });
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

const editAvatarFormElement = editAvatarModal.querySelector(".modal__form");
const editAvatarLinkInput = editAvatarModal.querySelector(
  "#edit-profile-picture",
);
const avatarSaveBtn = editAvatarModal.querySelector(".modal__save-btn");

editAvatarCloseBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  closeModal(editAvatarModal);
});
editAvatarBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  openModal(editAvatarModal);
});

function handleSaveAvatar(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatar(editAvatarLinkInput.value)
    .then((data) => {
      profileAvatarElement.src = data.avatar;
      editAvatarFormElement.reset();
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

editAvatarFormElement.addEventListener("submit", handleSaveAvatar);

enableValidation(settings);
