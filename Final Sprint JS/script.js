console.log("Javascript file has been integrated properly.");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Display the JSON data in the console

    // Display one pair to test
    data.forEach((record) => {
      console.log(`Name: ${record.name}`);
    });

    // Display data in HTML
    displayPlayers(data);
    displaySummary(data);
  })
  .catch((error) => console.error("Error fetching the JSON file:", error));

function displayPlayers(players) {
  const contentDiv = document.getElementById("content");
  players.forEach((player) => {
    const playerDiv = document.createElement("div");
    playerDiv.innerHTML = `
      <h2>${player.name}</h2>
      <p>Position: ${player.position}</p>
      <p>Number: ${player.number}</p>
      <p>Team: ${player.team}</p>
      <p>Hall of Fame: ${player.hallOfFame}</p>
      <p>Champion?: ${player.champion}</p>
      <p>Career PPG: ${player.careerPPG}</p>
      <p>Career AST: ${player.careerAST}</p>
      <p>Career REB: ${player.careerREB}</p>
      <p>Rookie Season: ${player.rookieSeason}</p>
      <p>Last Season Played: ${player.lastSeasonPlayed}</p>
      <br/>
      <p>Career Duration: ${getCareerDuration(
        player.rookieSeason,
        player.lastSeasonPlayed
      )} years</p>
    `;
    contentDiv.appendChild(playerDiv);
  });
}

function displaySummary(players) {
  const summaryDiv = document.getElementById("summary");
  summaryDiv.innerHTML = `
    <h2>Summary</h2>
    <p>Player Names: ${getPlayerNames(players)}</p>
    <p>Hall of Famers: ${getHallOfFamers(players)}</p>
  `;
}

function getPlayerNames(players) {
  return players.map((player) => player.name).join(", ");
}

function getHallOfFamers(players) {
  return players
    .filter((player) => player.hallofFame)
    .map((player) => player.name)
    .join(", ");
}

function getPlayersByPosition(players, position) {
  return players
    .filter((player) => player.position === position)
    .map((player) => player.name)
    .join(", ");
}

function getCareerDuration(rookieSeason, lastSeasonPlayed) {
  return lastSeasonPlayed - rookieSeason;
}

// Call these functions and log their results
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("Player Names:", getPlayerNames(data));
    console.log("Hall of Famers:", getHallOfFamers(data));
    console.log("Centers:", getPlayersByPosition(data, "Center"));
  })
  .catch((error) => console.error("Error fetching the JSON file:", error));
