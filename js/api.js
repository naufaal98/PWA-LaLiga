const API_KEY = "3e86aabd5c544f5093c180c11ed391d6"
const base_url_football = "https://api.football-data.org/v2/"

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function standingsTable (data) {
  let standings = ""
  data.standings[0].table.map((team, index) => {
    let urlImg = team.team.crestUrl
    urlImg = urlImg.replace("http", "https")
    urlImg = urlImg.replace("httpss", "https")
    standings += `
      <tr>
        <td class="standingsTeamName">
          <span>${index + 1}. </span>
          <figure class="standingsTeamLogo">
              <img src="${urlImg}" alt="${team.team.name}">
          </figure>
          <a href="./teamDetail.html?id=${team.team.id}" class="blue-grey-text text-darken-2">${team.team.name}</a>
        </td>
        <td>${team.playedGames}</td>
        <td>${team.won}</td>
        <td>${team.draw}</td>
        <td>${team.lost}</td>
        <td>${team.goalsFor}</td>
        <td>${team.goalsAgainst}</td>
        <td>${team.goalDifference}</td>
        <td>${team.points}</td>
      </tr>
    `
  })

  document.getElementById('standings').innerHTML = standings
}

function getStandings(id_liga) {
  if ('caches' in window) {
    caches.match(base_url_football + "competitions/"+ id_liga +"/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          standingsTable(data)
        })
      }
    })
  }
  
  fetch(base_url_football + "competitions/"+ id_liga +"/standings", {
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
  .then(status)
  .then(json)
  .then(function(data) {
    standingsTable(data)
  })
}

function getTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  fetch(base_url_football + "teams/" + idParam, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data)
      let activeCompetitions = ""
      data.activeCompetitions.map(competition => {
        activeCompetitions += `
          <li class="collection-item">${competition.name}</li>
        `
      })

      let squad = ""
      data.squad.map(player => {
        squad += `
          <li class="collection-item">
            <span class="title">${player.name}</span>
            <p>${player.position} </p>
          </li>
        `
      })

      let urlImg = data.crestUrl
      urlImg = urlImg.replace("http", "https")
      urlImg = urlImg.replace("httpss", "https")

      let teamProfile = `
      <div class="card teamProfile">
        <div class="row">
            <div class="col s12 m12" style="border-bottom: 2px solid #ccc; text-align: center;">
              <figure class="teamProfileImg">
                <img src="${urlImg}" alt="${data.name}">
              </figure>
              <h2>${data.name}</h2>
            </div>
            <hr>
            <div class="col s12 m12">
              <h3>Team Profile</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>${data.name}</td>
                  </tr>
                  <tr>
                    <td>Short Name</td>
                    <td>:</td>
                    <td>${data.shortName}</td>
                  </tr>
                  <tr>
                    <td>TLA</td>
                    <td>:</td>
                    <td>${data.tla}</td>
                  </tr>
                  <tr>
                    <td>Website</td>
                    <td>:</td>
                    <td>${data.website}</td>
                  </tr>
                  <tr>
                    <td>Founded</td>
                    <td>:</td>
                    <td>${data.founded}</td>
                  </tr>
                  <tr>
                    <td>Venue</td>
                    <td>:</td>
                    <td>${data.venue}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col s12 m12">
              <h3>Active Competition</h3>
              <ul class="collection">
                ${activeCompetitions}
              </ul>
            </div>
            <div class="col s12 m12">
              <h3>Squad</h3>
              <ul class="collection">
                ${squad}
              </ul>
            </div>
        </div>
      </div>
      `

      document.getElementById("body-content").innerHTML = teamProfile
    })
    .catch(err => console.log(err))
}