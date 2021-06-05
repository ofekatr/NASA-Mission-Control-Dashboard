const API_ENDPOINT = "http://localhost:8081";

async function httpGetPlanets() {
  const response = await fetch(`${API_ENDPOINT}/planets`);
  return response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_ENDPOINT}/launches`);
  return response.json();
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_ENDPOINT}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_ENDPOINT}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
