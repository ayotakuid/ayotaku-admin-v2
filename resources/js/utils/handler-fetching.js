const BASE_URL = "http://localhost:9001/api"

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

export default {
  checkingToken,
  handlerFetchingSignOut,
  handlerFetchingProfile,
};
