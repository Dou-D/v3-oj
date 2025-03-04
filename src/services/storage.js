const PREFIX = "sylu_";

// 用户头
const USER_PREFIX = `${PREFIX}oj_`;

const USER_TOKEN = `${USER_PREFIX}token`;
const USER_INFO = `${USER_PREFIX}info`;

const set = (key, value) => {
  localStorage.setItem(key, value);
};

const get = (key) => localStorage.getItem(key);

const remove = (key) => localStorage.removeItem(key);
export default {
  set,
  get,
  remove,
  USER_TOKEN,
  USER_INFO,
};
