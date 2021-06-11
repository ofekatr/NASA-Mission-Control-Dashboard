import { loadLaunchApi } from "@launch";
import { loadPlanetApi, loadPlanetData } from "@planet";

async function loadModulesData() {
    await loadPlanetData();
}

export {
    loadModulesData,
    loadLaunchApi,
    loadPlanetApi
};
