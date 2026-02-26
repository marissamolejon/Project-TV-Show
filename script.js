//You can edit ALL of the code here
const episodesContainer = document.getElementById("episodes-container");

function pad(number) {
  return number.toString().padStart(2, "0");
}

function createEpisodeCode(season, number) {
  return `S${pad(season)}E${pad(number)}`;
}

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
  ${episode.summary}`;

    episodesContainer.appendChild(card);
  });
   document.getElementById("numberOfEpisodes").textContent =
    `Displaying ${episodeList.length}/${allEpisodes.length} episodes`;
}
function searchEpisodes(allEpisodes) {
  searchBox.addEventListener("input", () => {
    let searchValue = searchBox.value.toLowerCase();
    let result = allEpisodes.filter(
      (seasonObj) =>
        seasonObj.name.toLowerCase().includes(searchValue) ||
        seasonObj.summary.toLowerCase().includes(searchValue),
    );
    displayEpisodes(result);
    document.getElementById("displayNumOfEpisodes").textContent =
      `Displaying ${result.length}/${allEpisodes.length} items`;
  });
}

function dropdown(episodeList) {
  let listDropdown = document.getElementById("dropdown");

  episodeList.forEach((episode) => {
    const episodeTitle = document.createElement("option");
    const episodeCode = createEpisodeCode(episode.season, episode.number);
    episodeTitle.text = `${episodeCode} - ${episode.name}`;
    episodeTitle.value = episodeCode;
    listDropdown.add(episodeTitle);
  });

  listDropdown.addEventListener("change", (event) => {
    window.location.hash = event.target.value;
  });
}

const allEpisodes = getAllEpisodes();
displayEpisodes(allEpisodes);

let searchBox = document.getElementById("searchBar");
if (searchBox.value != null) {
  searchEpisodes(allEpisodes);
}

dropdown(allEpisodes);
