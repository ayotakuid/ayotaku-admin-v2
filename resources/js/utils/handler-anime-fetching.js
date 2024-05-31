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

const softDeleteAnime = async (token, data) => {
  const headerSoftDelete = new Headers();
  headerSoftDelete.append("Content-Type", "application/json");
  headerSoftDelete.append("Authorization", `Bearer ${token}`);

  const dataBody = JSON.stringify({
    animeUuid: data
  })

  const requestOptions = {
    method: 'DELETE',
    headers: headerSoftDelete,
    body: dataBody,
    redirect: "follow",
  };

  try {
    const softDeleteAnime = await fetch(`${BASE_URL}/anime/delete`, requestOptions);
    const result = await softDeleteAnime.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default {
  createAnime,
  softDeleteAnime
}