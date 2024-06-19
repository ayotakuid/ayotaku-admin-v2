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

const showDeleteAnime = async (token) => {
  const headersShowDelete = new Headers();
  headersShowDelete.append("Content-Type", "application/json");
  headersShowDelete.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: headersShowDelete,
    redirect: 'follow',
  }

  try {
    const showDeleteAnime = await fetch(`${BASE_URL}/anime/all/delete`, requestOptions);
    const result = await showDeleteAnime.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  } 
}

const recoveryAnime = async (token, uuid) => {
  const headersRecoveryAnime = new Headers();
  headersRecoveryAnime.append("Content-Type", "application/json");
  headersRecoveryAnime.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'PUT',
    headers: headersRecoveryAnime,
    body: JSON.stringify({
      animeUuid: uuid
    }),
    redirect: 'follow',
  }

  try {
    const recoveryAnime = await fetch(`${BASE_URL}/anime/recovery`, requestOptions);
    const result = await recoveryAnime.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const syncAnimeById = async (token, data) => {
  const headersSyncAnime = new Headers();
  headersSyncAnime.append("Content-Type", "application/json");
  headersSyncAnime.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'PUT',
    headers: headersSyncAnime,
    body: JSON.stringify({
      animeUuid: data?.uuid,
      animeIdMal: data?.idMal
    }),
    redirect: 'follow',
  }

  try {
    const responseSync = await fetch(`${BASE_URL}/anime/sync-anime`, requestOptions);
    const result = await responseSync.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const manualEditAnime = async (token, data) => {
  const headerManualEditAnime = new Headers();
  headerManualEditAnime.append("Content-Type", "application/json");
  headerManualEditAnime.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'PUT',
    headers: headerManualEditAnime,
    body: JSON.stringify({
      animeUuid: data?.uuid,
      imageUrl: data?.image,
      videoUrl: data?.video,
    }),
    redirect: 'follow',
  }

  try {
    const responseManual = await fetch(`${BASE_URL}/anime/manual-edit`, requestOptions);
    const result = await responseManual.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default {
  createAnime,
  softDeleteAnime,
  showDeleteAnime,
  recoveryAnime,
  syncAnimeById,
  manualEditAnime
}