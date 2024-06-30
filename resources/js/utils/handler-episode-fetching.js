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

const showDeleteEpisode = async (token) => {
  const headersShowDelete = new Headers();
  headersShowDelete.append("Content-Type", "application/json");
  headersShowDelete.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: headersShowDelete,
    redirect: 'follow',
  };

  try {
    const showDelete = await fetch(`${BASE_URL}/anime/episode/delete`, requestOptions);
    const result = await showDelete.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const recoveryEpisode = async (token, uuid) => {
  const headersRecovery = new Headers();
  headersRecovery.append("Content-Type", "application/json");
  headersRecovery.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'PUT',
    headers: headersRecovery,
    body: JSON.stringify({
      episodeUuid: uuid,
    }),
    redirect: 'follow',
  }

  try {
    const recoveryEpisode = await fetch(`${BASE_URL}/anime/episode/recovery`, requestOptions);
    const result = await recoveryEpisode.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const editEpisode = async (token, uuid, dataEps, checking) => {
  const headerEditEpisode = new Headers();
  headerEditEpisode.append("Content-Type", "application/json");
  headerEditEpisode.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'PUT',
    headers: headerEditEpisode,
    body: JSON.stringify({
      episodeUuid: uuid,
      dataEpisode: dataEps,
      checkingEpisode: checking,
    }),
    redirect: 'follow',
  };

  try {
    const responseEditEpisode = await fetch(`${BASE_URL}/anime/episode/edit`, requestOptions);
    const result = await responseEditEpisode.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default {
  createEpisode,
  showAllEpisode,
  softDeleteEpisode,
  showDeleteEpisode,
  recoveryEpisode,
  editEpisode,
}