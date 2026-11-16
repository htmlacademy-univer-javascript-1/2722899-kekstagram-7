import {
  NAMES,
  MESSAGES,
  DESCRIPTIONS,
  MIN_LIKES,
  MAX_LIKES,
  MIN_COMMENTS,
  MAX_COMMENTS,
  MIN_AVATAR,
  MAX_AVATAR
} from './data.js';
import { getRandomInteger, getRandomElement } from './utils.js';

let commentId = 1;

export const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR, MAX_AVATAR)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES)
});

export const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    { length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) },
    createComment
  )
});
