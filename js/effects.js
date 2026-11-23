const EFFECTS = {
  none: null,
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

const previewImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const noneEffectRadio = document.querySelector('#effect-none');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const levelInput = document.querySelector('.effect-level__value');

let currentEffect = 'none';

noUiSlider.create(slider, {
  range: { min: 0, max: 1 },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)),
    from: (value) => parseFloat(value)
  }
});

const applyEffect = () => {
  const effect = EFFECTS[currentEffect];

  if (!effect) {
    previewImage.style.filter = '';
    levelInput.value = '';
    return;
  }

  const value = slider.noUiSlider.get();
  levelInput.value = value;
  previewImage.style.filter = `${effect.filter}(${value}${effect.unit})`;
};

const setEffect = (name) => {
  currentEffect = name;
  const effect = EFFECTS[name];

  if (!effect) {
    sliderContainer.classList.add('hidden');
    applyEffect();
    return;
  }

  sliderContainer.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    start: effect.max,
    step: effect.step
  });
  slider.noUiSlider.set(effect.max);
};

function onSliderUpdate() {
  applyEffect();
}

function onEffectsListChange(evt) {
  if (evt.target.matches('input[name="effect"]')) {
    setEffect(evt.target.value);
  }
}

export const resetEffects = () => {
  noneEffectRadio.checked = true;
  setEffect('none');
};

slider.noUiSlider.on('update', onSliderUpdate);
effectsList.addEventListener('change', onEffectsListChange);
setEffect('none');
