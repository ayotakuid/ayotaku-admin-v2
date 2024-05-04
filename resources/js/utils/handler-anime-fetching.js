import { BASE_URL } from '../utils/others/config.json';

const createAnime = async (token, data) => {
  const headersCreateAnime = new Headers();
  headersCreateAnime.append("Content-Type", "application/json");
  headersCreateAnime.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: headersCreateAnime,
    body: JSON.stringify(data),
    redirect: "follow"
  };

  try {
    const createAnime = await fetch(`${BASE_URL}/anime/create`, requestOptions);
    const result = await createAnime.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default {
  createAnime
}