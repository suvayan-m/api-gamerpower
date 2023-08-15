"use strict";

// SETTING UP VARIABLES
const setDays = 30;
let daysAgo;
let receivedData;
let arr = [];
const container = document.getElementById("content");
daysAgo = new Date(Date.now() - setDays * 24 * 60 * 60 * 1000);

// INSERT HERE
const html = `
<h1>Gamerpower Giveaways</h1>
<p>
  This site uses the official Gamerpower API to show you the giveaways
  posted from past ${setDays} days.
</p>
`;
container.insertAdjacentHTML("afterbegin", html);

const url =
  "https://corsproxy.io/?" +
  encodeURIComponent("https://www.gamerpower.com/api/giveaways");

// FETCHING DATA FROM URL
fetch(url)
  .then((res) => res.json()) // PARSING DATA AS JSON
  .then((data) => {
    receivedData = data;
    renderGames(receivedData);
    renderTimer();
  })
  .catch((err) => {
    // IF ERROR RECEIVING DATA
    console.error(err);
  });

// RENDER THE GAMES
const renderGames = function (receivedData) {
  receivedData.forEach((game) => {
    if (new Date(game.published_date) >= daysAgo) {
      // CREATING HTML TO INSERT INTO CONTAINER
      const html = `
        <div class="col-lg-3 col-md-4 col-sm-6 p-2" data-id="${game.id}">
          <div class="item p-2">
            <img src="${game.thumbnail}" alt="Thumbnail of the game" class="mb-3" />
            <h4>${game.title}</h4>
            <div class="tags">
              <p class="bg-5 timer" id="${game.id}">${game.status}</p> 
              <p class="bg-1">💻 ${game.platforms}</p>
              <p class="bg-2">🆓 ${game.type}</p>
              <p class="bg-3">💰 ${game.worth}</p>
              <p class="bg-4">👤 ${game.users}</p>                    
            </div>
            <p>
              ${game.description}
            </p>
            <div class="links">
              <a href="${game.open_giveaway_url}" class="btn btn-primary">Get now</a>
              <a href="${game.gamerpower_url}" class="btn btn-outline-primary">Gamerpower</a>
          </div>
      </div>
        `;
      container.insertAdjacentHTML("beforeend", html);
      if (game.end_date != "N/A" && new Date(game.end_date) > Date.now()) {
        arr.push({ id: game.id, dateOfExpiry: game.end_date });
      }
    }
  });
};

// RENDER THE TIMER IF APPLICABLE
const renderTimer = function () {
  arr.forEach(function (el) {
    // Set the date we're counting down to
    const countDownDate = new Date(el.dateOfExpiry).getTime();

    // Update the count down every 1 second
    const x = setInterval(function () {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element
      document.getElementById(
        `${el.id}`
      ).innerHTML = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`;

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById(`${el.id}`).innerHTML = "Expired";
      }
    }, 1000);
  });
};
