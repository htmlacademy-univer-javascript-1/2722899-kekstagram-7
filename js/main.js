const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const NAMES = [
  'Эвелина Космоградова',
  'Ярополк Верхоланцев',
  'Агафья Мурлыкина',
  'Всеволод Затмениев',
  'Пелагея Звёздочкина',
  'Добрыня Луноцапов',
  'Устинья Ветродуева',
  'Тихон Облаков',
  'Марфа Сереброзубова',
  'Елисей Громогласов',
  'Аглая Перламутрова',
  'Захар Солнцеворотов'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Закат над крышами спящего города',
  'Кот философствует на подоконнике',
  'Туман в утреннем лесу',
  'Кофе и книга в дождливый день',
  'Огни ночного мегаполиса',
  'Пикник на облаке (почти)',
  'Танцующие тени на стене',
  'Морской бриз и солёные брызги',
  'Старый фонарь на пустой улице',
  'Первый снег и восторг',
  'Полевые цветы в стеклянной банке',
  'Велосипед у моря'
];

let commentId = 1;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

const getRandomElement = (array) => array[getRandomInteger(0, array.length - 1)];

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES)
});

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) },
    createComment
  )
});

const photos = Array.from({ length: PHOTOS_COUNT }, (_, index) => createPhoto(index + 1));
