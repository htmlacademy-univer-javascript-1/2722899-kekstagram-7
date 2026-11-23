import { PHOTOS_COUNT } from './data.js';
import { createPhoto } from './photo.js';
import { renderPictures } from './render.js';
import { openBigPicture } from './big-picture.js';
import './form.js';

export const photos = Array.from(
  { length: PHOTOS_COUNT },
  (_, index) => createPhoto(index + 1)
);

renderPictures(photos, openBigPicture);
