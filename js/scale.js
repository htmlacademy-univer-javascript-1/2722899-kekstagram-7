const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const setScale = (value) => {
  scaleInput.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const getScale = () => parseInt(scaleInput.value, 10);

function onSmallerButtonClick() {
  setScale(Math.max(getScale() - SCALE_STEP, SCALE_MIN));
}

function onBiggerButtonClick() {
  setScale(Math.min(getScale() + SCALE_STEP, SCALE_MAX));
}

export const resetScale = () => setScale(SCALE_DEFAULT);

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);
resetScale();
