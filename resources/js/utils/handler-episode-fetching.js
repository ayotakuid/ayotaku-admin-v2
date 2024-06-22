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

export default {
  createEpisode,
}