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

export default {
  checkingToken,
};
