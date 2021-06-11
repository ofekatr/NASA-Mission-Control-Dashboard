import { loadPlanetData } from "@planet";

async function loadModulesData() {
    await loadPlanetData();
}

export {
    loadModulesData,
}