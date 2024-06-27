import { BASE_URL } from '../utils/others/config.json';

const createEpisode = async (token, data) => {
  const headersEpisodeAnime = new Headers();
  headersEpisodeAnime.append("Content-Type", "application/json");
  headersEpisodeAnime.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: headersEpisodeAnime,
    body: JSON.stringify(data),
    redirect: "follow"
  };

  try {
    const createEpisode = await fetch(`${BASE_URL}/anime/episode/add`, requestOptions);
    const result = await createEpisode.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const showAllEpisode = async (token) => {
  const headersShowEpisode = new Headers();
  headersShowEpisode.append("Content-Type", "application/json");
  headersShowEpisode.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: headersShowEpisode,
    redirect: 'follow'
  };

  try {
    const showEpisode = await fetch(`${BASE_URL}/anime/episode/all`, requestOptions);
    const result = await showEpisode.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const softDeleteEpisode = async (token, data) => {
  const headerSoftDelete = new Headers();
  headerSoftDelete.append("Content-Type", "application/json");
  headerSoftDelete.append("Authorization", `Bearer ${token}`);

  const dataBody = JSON.stringify({
    episodeUuid: data,
  });

  const requestOptions = {
    method: "DELETE",
    headers: headerSoftDelete,
    body: dataBody,
    redirect: "follow"
  };

  try {
    const softDeleteEpisode = await fetch(`${BASE_URL}/anime/episode/delete`, requestOptions);
    const result = await softDeleteEpisode.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default {
  createEpisode,
  showAllEpisode,
  softDeleteEpisode,
}