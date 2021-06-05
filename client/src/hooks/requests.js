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
    }
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
