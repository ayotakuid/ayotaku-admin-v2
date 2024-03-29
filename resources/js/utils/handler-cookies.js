const setCookies = (name, value, expTime) => {
  const date = new Date();
  date.setTime(date.getTime() + (expTime * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

const getCookies = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

const deleteCookies = (name) => {
  document.cookie = `${name}=;expires=Thu, 30 March 2023 00:00:00 GMT;`
}

export default {
  setCookies,
  getCookies,
  deleteCookies,
};