import galery from "./gallery-items.js";
// console.log(galery);

const refs = {
  galery: document.querySelector(".js-gallery"),
  jsLightbox: document.querySelector(".js-lightbox"),
  button: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxImage: document.querySelector(".lightbox__image"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

function creteGalery(galery) {
  const createImg = galery.reduce(
    (acc, { preview, original, description }, index) => {
      acc += `<li class="gallery__item"> <a class="gallery__link" href=${original}> <img class="gallery__image" src=${preview} data-source=${original} alt=${description} data-index=${index}/> </a></li>`;
      return acc;
    },
    ""
  );
  return createImg;
}

function galeryOnClick(event) {
  event.preventDefault();

  const imageRef = event.target;
  if (imageRef.nodeName !== "IMG") {
    return;
  }
  const largeImageURL = imageRef.dataset.source;
  openModal(largeImageURL, imageRef);
}

function openModal(largeImageURL, imageRef) {
  refs.jsLightbox.classList.add("is-open");
  refs.lightboxImage.src = largeImageURL;
  refs.lightboxImage.alt = imageRef;
  refs.lightboxImage.dataset.index = imageRef.dataset.index;
  Window.addEventListener("keydown", closeOnEsc);
}

function closeModal() {
  refs.jsLightbox.classList.remove("is-open");
  Window.addEventListener("keydown", closeOnEsc);
}

function closeOnButton() {
  closeModal();
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
}
function backDropOnClick() {
  closeModal();
  refs.lightboxImage.src = "";
  refs.lightboxImage.alt = "";
}

function closeOnEsc(event) {
  if (event.code === "Escape") {
    closeModal();
    refs.lightboxImage.src = "";
    refs.lightboxImage.alt = "";
  }
}

refs.galery.insertAdjacentHTML("afterbegin", creteGalery(galery));
refs.galery.addEventListener("click", galeryOnClick);
refs.button.addEventListener("click", closeOnButton);
refs.lightboxOverlay.addEventListener("click", backDropOnClick);
