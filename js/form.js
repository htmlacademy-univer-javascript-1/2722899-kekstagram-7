import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const validateHashtagsFormat = (value) =>
  getHashtags(value).every((hashtag) => HASHTAG_REGEXP.test(hashtag));

const validateHashtagsCount = (value) =>
  getHashtags(value).length <= MAX_HASHTAGS;

const validateHashtagsUnique = (value) => {
  const hashtags = getHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};

const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInput,
  validateHashtagsFormat,
  'Хэш-тег начинается с #, состоит из букв и цифр и не длиннее 20 символов',
  3,
  true
);
pristine.addValidator(
  hashtagInput,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`,
  2,
  true
);
pristine.addValidator(
  hashtagInput,
  validateHashtagsUnique,
  'Хэш-теги не должны повторяться',
  1,
  true
);
pristine.addValidator(
  descriptionInput,
  validateDescription,
  `Комментарий не длиннее ${MAX_COMMENT_LENGTH} символов`
);

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  form.reset();
  fileInput.value = '';
  pristine.reset();
  resetScale();
  resetEffects();
};

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
}

function onTextFieldKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function onFileInputChange() {
  openForm();
}

function onCancelButtonClick(evt) {
  evt.preventDefault();
  closeForm();
}

function onFormSubmit(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

fileInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
hashtagInput.addEventListener('keydown', onTextFieldKeydown);
descriptionInput.addEventListener('keydown', onTextFieldKeydown);
form.addEventListener('submit', onFormSubmit);
