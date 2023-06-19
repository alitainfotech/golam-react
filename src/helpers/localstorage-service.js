function getItem(key) {
  const val = localStorage.getItem(key) || null;
  return val ? JSON.parse(val) : val;
}

function setItem(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function updateItem(key, fieldKey, value) {
  const data = getItem(key);
  data[fieldKey] = value;
  return localStorage.setItem(key, JSON.stringify(data));
}

function removeItem(key) {
  return localStorage.removeItem(key);
}

const LocalstorageService = {
  getItem,
  setItem,
  updateItem,
  removeItem,
};

export default LocalstorageService;
