// ================== GLOBAL ==================

const episodesContainer = document.getElementById("episodes-container");
const searchBox = document.getElementById("searchBar");
const dropdownMenu = document.getElementById("dropdown");

let allEpisodes = [];

// ================== UTILITIES ==================

function pad(number) {
  return number.toString().padStart(2, "0");
}

function createEpisodeCode(season, number) {
  return `S${pad(season)}E${pad(number)}`;
}

// ================== FETCH DATA ==================

window.onload = function () {
  fetchEpisodes();
};

function fetchEpisodes() {
  episodesContainer.innerHTML = "<p>Loading episodes...</p>";

  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      allEpisodes = data;

      displayEpisodes(allEpisodes);
      searchEpisodes();
      setupDropdown();
    })
    .catch((error) => {
      episodesContainer.innerHTML =
        "<p style='color:red;'>Error loading episodes. Please try again later.</p>";
    });
}

// ================== DISPLAY ==================

function displayEpisodes(episodeList) {
  episodesContainer.innerHTML = "";

  episodeList.forEach((episode) => {
    const card = document.createElement("div");
    card.className = "episode-card";

    const episodeCode = createEpisodeCode(episode.season, episode.number);
    card.id = episodeCode;

    card.innerHTML = `
      <div class="episode-header">
        <h2>${episodeCode} - ${episode.name}</h2>
      </div>
      <img src="${episode.image.medium}" alt="${episode.name}">
      ${episode.summary}
    `;

    episodesContainer.appendChild(card);
  });

  document.getElementById("numberOfEpisodes").textContent =
    `Displaying ${episodeList.length}/${allEpisodes.length} episodes`;
}

// ================== SEARCH ==================

function searchEpisodes() {
  searchBox.addEventListener("input", () => {
    const searchValue = searchBox.value.toLowerCase();

    const result = allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(searchValue) ||
        episode.summary.toLowerCase().includes(searchValue)
    );

    displayEpisodes(result);
  });
}

// ================== DROPDOWN ==================

function setupDropdown() {
  dropdownMenu.innerHTML = `<option value="">Jump to episode...</option>`;

  allEpisodes.forEach((episode) => {
    const episodeCode = createEpisodeCode(
      episode.season,
      episode.number
    );

    const option = document.createElement("option");
    option.text = `${episodeCode} - ${episode.name}`;
    option.value = episodeCode;

    dropdownMenu.add(option);
  });

  dropdownMenu.addEventListener("change", (event) => {
    const selected = event.target.value;

    if (!selected) {
      displayEpisodes(allEpisodes);
      return;
    }

    const filtered = allEpisodes.filter(
      (ep) => createEpisodeCode(ep.season, ep.number) === selected
    );

    displayEpisodes(filtered);
  });
}