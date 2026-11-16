const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = (photo, onPictureClick) => {
  const { url, description, likes, comments } = photo;
  const picture = pictureTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = Array.isArray(comments)
    ? comments.length
    : comments;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    onPictureClick(photo);
  });

  return picture;
};

export const renderPictures = (photos, onPictureClick) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createPicture(photo, onPictureClick));
  });

  picturesContainer.appendChild(fragment);
};
