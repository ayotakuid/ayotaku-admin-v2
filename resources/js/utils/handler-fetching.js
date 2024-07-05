import { BASE_URL } from '../utils/others/config.json';

const handlerCallbackLogin = async (code) => {
  const headerCallbackLogin = new Headers();
  headerCallbackLogin.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: headerCallbackLogin,
    body: JSON.stringify({
      "code": code,
    }),
    redirect: 'follow',
  };

  try {
    const responseFetchinCallback = await fetch(`${BASE_URL}/admin/callback`, requestOptions)
    const result = await responseFetchinCallback.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const checkingToken = async (token) => {
  const headersCheckingToken = new Headers();
  headersCheckingToken.append("Content-Type", "application/json");
  headersCheckingToken.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'POST',
    headers: headersCheckingToken,
    redirect: "follow"
  }

  try {
    const checkingToken = await fetch(`${BASE_URL}/check-token`, requestOptions);
    const result = await checkingToken.json();
    return result
  } catch (err) {
    console.error(err);
  }
}

const handlerFetchingSignOut = async (token) => {
  const headersSignOut = new Headers();
  headersSignOut.append("Content-Type", "application/json");
  headersSignOut.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: headersSignOut,
    redirect: 'follow',
  };

  try {
    const signout = await fetch(`${BASE_URL}/admin/signout`, requestOptions);
    const result = await signout.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const handlerFetchingProfile = async (token) => {
  const headersProfile = new Headers();
  headersProfile.append("Content-Type", "application/json");
  headersProfile.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: headersProfile,
    redirect: 'follow',
  };

  try {
    const profile = await fetch(`${BASE_URL}/admin/profile`, requestOptions);
    const result = await profile.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const handlerFetchingTotal = async (token) => {
  const headersTotal = new Headers();
  headersTotal.append("Content-Type", "application/json");
  headersTotal.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: headersTotal,
    redirect: "follow",
  };

  try {
    const total = await fetch(`${BASE_URL}/admin/total-all`, requestOptions);
    const result = await total.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const handlerFetchingLogs = async (token) => {
  const headersLogs = new Headers();
  headersLogs.append("Content-Type", "application/json");
  headersLogs.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: headersLogs,
    redirect: "follow",
  };

  try {
    const logsAll = await fetch(`${BASE_URL}/admin/logs`, requestOptions);
    const result = await logsAll.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const handlerFethcingScheduleWeek = async () => {
  const headersSchedule = new Headers();
  headersSchedule.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: headersSchedule,
    redirect: "follow",
  };

  try {
    const scheduleWeek = await fetch(`${BASE_URL}/anime/schedule`, requestOptions);
    const result = await scheduleWeek.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const handlerFetchingSearchAnime = async (token, anime) => {
  const headersSearchAnime = new Headers();
  headersSearchAnime.append("Content-Type", "application/json");
  headersSearchAnime.append("Authorization", `Bearer ${token}`);

  const bodyRaw = JSON.stringify({
    nama_anime: anime,
  });

  const requestOptions = {
    method: "POST",
    headers: headersSearchAnime,
    body: bodyRaw,
    redirect: "follow",
  };

  try {
    const searchAnime = await fetch(`${BASE_URL}/anime/search`, requestOptions);
    const result = await searchAnime.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  };
};

const handlerFetchingDetailAnime = async (token, animeId) => {
  const headersDetailAnime = new Headers();
  headersDetailAnime.append("Content-Type", "application/json");
  headersDetailAnime.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: headersDetailAnime,
    redirect: "follow",
  };

  try {
    const detailAnime = await fetch(`${BASE_URL}/anime/mal/${animeId}/detail`, requestOptions);
    const result = await detailAnime.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  };
};

const handlerFetchingShowAllAnime = async (token) => {
  const headersShowAnime = new Headers();
  headersShowAnime.append("Content-Type", "application/json");
  headersShowAnime.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: headersShowAnime,
    redirect: "follow"
  }

  try {
    const showAnime = await fetch(`${BASE_URL}/anime/all`, requestOptions);
    const result = await showAnime.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const handlerFetchingShowAllUsers = async (token) => {
  const headersUsers = new Headers();
  headersUsers.append("Content-Type", "application/json");
  headersUsers.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: headersUsers,
    redirect: 'follow',
  };

  try {
    const fetchingUsers = await fetch(`${BASE_URL}/users`, requestOptions);
    const resultUsers = await fetchingUsers.json();
    return resultUsers;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const handlerFetchingEditRoleUser = async (token, data) => {
  const headerEditRole = new Headers();
  headerEditRole.append("Content-Type", "application/json");
  headerEditRole.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'PUT',
    headers: headerEditRole,
    body: JSON.stringify({
      name_mal: data.name_mal,
      role: data.role,
    }),
    redirect: 'follow',
  };

  try {
    const fetchingEditRole = await fetch(`${BASE_URL}/users/role/update`, requestOptions);
    const resultEditRole = await fetchingEditRole.json();
    return resultEditRole;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default {
  handlerCallbackLogin,
  checkingToken,
  handlerFetchingSignOut,
  handlerFetchingProfile,
  handlerFetchingTotal,
  handlerFetchingLogs,
  handlerFethcingScheduleWeek,
  handlerFetchingSearchAnime,
  handlerFetchingDetailAnime,
  handlerFetchingShowAllAnime,
  handlerFetchingShowAllUsers,
  handlerFetchingEditRoleUser
};
