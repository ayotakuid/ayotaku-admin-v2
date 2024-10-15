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

const fetchingSearchAnime = async (token, anime) => {
  const headerSearchAnime = new Headers();
  headerSearchAnime.append("Content-Type", "application/json");
  headerSearchAnime.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: headerSearchAnime,
    redirect: 'follow',
  }

  try {
    const responseSearchAnime = await fetch(`${BASE_URL}/anime/searchAnime?nama_anime=${anime}`, requestOptions);
    const result = await responseSearchAnime.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const fetchingSaveRecommend = async (token, dataRecommend) => {
  const headerSaveRecommend = new Headers();
  headerSaveRecommend.append("Content-Type", "application/json");
  headerSaveRecommend.append("Authorization", `Bearer ${token}`);
  
  const raw = JSON.stringify({
    "id_anime": dataRecommend?.id_anime_db,
    "slug_anime": dataRecommend?.slug_anime,
    "default_img": dataRecommend?.default_img,
    "edit_img": dataRecommend?.edit_img
  });
  
  const requestOptions = {
    method: "POST",
    headers: headerSaveRecommend,
    body: raw,
    redirect: "follow"
  };

  try {
    const responseSaveRecommend = await fetch(`${BASE_URL}/anime/recommend`, requestOptions);
    const result = await responseSaveRecommend.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const fetchingShowRecommendAnime = async (token) => {
  const headersShowRecommend = new Headers();
  headersShowRecommend.append("Content-Type", "application/json");
  headersShowRecommend.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: headersShowRecommend,
    redirect: 'follow',
  };

  try {
    const responseShowRecommend = await fetch(`${BASE_URL}/anime/recommend`, requestOptions);
    const result = await responseShowRecommend.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const fetchingDeleteRecommendAnime = async (token, idAnime) => {
  const headersDeleteRecommend = new Headers();
  headersDeleteRecommend.append("Content-Type", "application/json");
  headersDeleteRecommend.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'DELETE',
    headers: headersDeleteRecommend,
    body: JSON.stringify({
      id_anime: idAnime,
    }),
    redirect: 'follow',
  };

  try {
    const responseDelete = await fetch(`${BASE_URL}/anime/recommend`, requestOptions);
    const result = await responseDelete.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const fetchingUpdateRecommendAnime = async (token, dataUpdate) => {
  const headersUpdateRecommend = new Headers();
  headersUpdateRecommend.append("Content-Type", "application/json");
  headersUpdateRecommend.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'PUT',
    headers: headersUpdateRecommend,
    body: JSON.stringify({
      recommendUuid: dataUpdate?.uuid,
      imageURL: dataUpdate?.image,
    }),
    redirect: 'follow',
  };

  try {
    const responseEdit = await fetch(`${BASE_URL}/anime/recommend`, requestOptions);
    const result = await responseEdit.json();
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
  manualEditAnime,
  fetchingSearchAnime,
  fetchingSaveRecommend,
  fetchingShowRecommendAnime,
  fetchingDeleteRecommendAnime,
  fetchingUpdateRecommendAnime,
}