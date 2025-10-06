"use strict";
// NAVIGATION TOGGLER
const toggleBtn = document.querySelector(".navbar-toggler");
toggleBtn.addEventListener("click", function (_e) {
  if (toggleBtn.getAttribute("aria-expanded") === "true") {
    document.querySelector(".fa-bars").classList.add("d-none");
    document.querySelector(".fa-xmark").classList.remove("d-none");
  } else {
    document.querySelector(".fa-bars").classList.remove("d-none");
    document.querySelector(".fa-xmark").classList.add("d-none");
  }
});
// NAVIGATION TOGGLER
// ENABLING TOOLTIPS
setTimeout(() => {
  // const tooltipTriggerList = document.querySelectorAll(
  //   '[data-bs-toggle="tooltip"]'
  // );
  // const tooltipList = [...tooltipTriggerList].map(
  //   (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  // );
}, 12000);
// ENABLING TOOLTIPS
// NAVIGATION COLOR
const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
// Define the callback function
function callback(entries) {
  // Loop through the entries
  entries.forEach((entry) => {
    // Check if the header is fully visible
    if (entry.isIntersecting /*&& entry.intersectionRatio === 1*/) {
      // Do something to the navbar when the header is fully visible
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
      navbar.style.backdropFilter = "blur(5px)";
    } else {
      // Do something else to the navbar when the header is not fully visible
      navbar.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      navbar.style.backdropFilter = "blur(5px)";
    }
  });
}

// Create the observer object
const observer = new IntersectionObserver(callback, {
  // Use the viewport as the root element
  root: null,
  // Set the root margin to zero
  rootMargin: "0px",
  // Set the threshold to 0.8 (80%)
  threshold: 0.8,
});

// Start observing the header element
observer.observe(header);
// NAVIGATION COLOR

// SETTING UP VARIABLES
const setDays = 30;
let daysAgo;
let receivedData;
let arr = [];
const container = document.getElementById("content");
daysAgo = new Date(Date.now() - setDays * 24 * 60 * 60 * 1000);
// const url =
// "https://corsproxy.org/?" +
// encodeURIComponent("https://www.gamerpower.com/api/giveaways");
// SETTING UP VARIABLES
// const url = `https://cors-proxy.htmldriven.com/?url=https://www.gamerpower.com/api/giveaways`;

// const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
//   "https://www.gamerpower.com/api/giveaways"
// )}`;
// const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
//   "https://www.gamerpower.com/api/giveaways"
// )}`;
const url = `https://corsproxy.io/?url=https://www.gamerpower.com/api/giveaways`;
// console.log(url);
// FUNCTIONS
// RENDER ERROR
const renderError = function (error) {
  container.innerHTML = "";
  const html = `
  <div class="col">
    <p class="fw-bold fs-3 text-light text-center">
      ${error}
    </p>
  </div>
  `;
  container.insertAdjacentHTML("beforeend", html);
};
// RENDER ERROR
// RENDER THE GAMES
const renderGames = function (receivedData) {
  container.innerHTML = "";
  receivedData.forEach((game) => {
    if (new Date(game.published_date) >= daysAgo) {
      // CREATING HTML TO INSERT INTO CONTAINER
      const html = `
      <div class="col-lg-4 col-md-6" data-id="${game.id}">
        <article class="item p-3 text-bg-dark d-flex flex-column rounded-4 h-100">
          <img
            src="${game.thumbnail}"
            alt="Thumbnail of the game"
            class="w-100 rounded-4 mb-3"
          />
          <h3
            class="game-title fs-4"
            data-bs-custom-class="custom-tooltip"
            data-bs-toggle="tooltip"
            data-bs-html="true"
            data-bs-title="<em>${game.title}</em>"
          >
            ${game.title}
          </h3>
          <p class="tags mb-3 small text-uppercase">
            <span
              class="bg-5 small timer py-1 px-1 fw-bolder rounded-1 d-inline-block mb-1"
              id="${game.id}"
              >${game.status}</span
            >
            <span class="bg-1 small py-1 px-1 fw-bolder rounded-1 d-inline-block mb-1"
              >💻 ${game.platforms}</span
            >
            <span class="bg-2 small py-1 px-1 fw-bolder rounded-1 d-inline-block mb-1"
              >🆓 ${game.type}</span
            >
            <span class="bg-3 small py-1 px-1 fw-bolder rounded-1 d-inline-block mb-1"
              >💰 ${game.worth}</span
            >
            <span class="bg-4 small py-1 px-1 fw-bolder rounded-1 d-inline-block mb-1"
              >👤 ${game.users}</span
            >
          </p>
          <p
            class="game-description mb-5"
            data-bs-custom-class="custom-tooltip"
            data-bs-toggle="tooltip"
            data-bs-html="true"
            data-bs-title="<em>${game.description}</em>"
          >
            ${game.description}
          </p>
          <div class="mt-auto">
            <a
              href="${game.open_giveaway_url}"
              target="_blank"
              class="btn btn-warning"
              >Get now <i class="fa-solid fa-arrow-right"></i
            ></a>
            <a href="${game.gamerpower_url}" target="_blank" class="btn btn-danger"
              >Gamerpower</a
            >
          </div>
        </article>
      </div>
        `;
      container.insertAdjacentHTML("beforeend", html);
      if (game.end_date != "N/A" && new Date(game.end_date) > Date.now()) {
        arr.push({ id: game.id, dateOfExpiry: game.end_date });
      }
    }
  });
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
};
// RENDER THE GAMES
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
// RENDER THE TIMER IF APPLICABLE
// FUNCTIONS
// 200: Success
// 201: No active giveaways available at the moment, please try again later.
// 404: Object not found: Giveaway or endpoint not found.
// 500: Something wrong on our end (unexpected server errors).
// ASYNC
const API_KEY =
  "1e58f1d34d5607d490b8cbc33fa686421df79cd0d8c3327ccf046ab9925f567f"; // The one you set in Cloudflare
const targetUrl = "https://www.gamerpower.com/api/giveaways";

// Combine your proxy + target URL
const proxyUrl = `https://my-cors-proxy.suvayanmondal57-cloudflare.workers.dev/${encodeURIComponent(
  targetUrl
)}`;
const getData = async function () {
  try {
    const res = await fetch(proxyUrl, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY, // your private proxy key (the Cloudflare worker checks this)
      },
    });
    // console.log(res);
    if (!res.ok) {
      // if (!res.ok)
      throw new Error(
        "There was some problem getting the data from the servers. Please try again later. :("
      );
    }
    const data = await res.json();
    // console.log(data.contents);
    receivedData = data;
    // receivedData = JSON.parse(data.contents);
    // console.log(typeof receivedData);
    renderGames(receivedData);
    renderTimer();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
};
// document.querySelector(".get-data").addEventListener("click", function () {
getData();
// });
// getData();
// setTimeout(() => {
//   getData();
// }, 8000);
// ASYNC

// FETCHING DATA FROM URL
// fetch(url)
//   .then((res) => res.json()) // PARSING DATA AS JSON
//   .then((data) => {
//     receivedData = data;
//     renderGames(receivedData);
//     renderTimer();
//   })
//   .catch((err) => {
//     // IF ERROR RECEIVING DATA
//     console.error(err);
//   });
// $(document).ready(function () {
//   console.log($(".navbar").outerHeight(true));
//   $('a[href^="#"]').on("click", function (e) {
//     e.preventDefault();

//     var target = this.hash,
//       $target = $(target);

//     $("html, body")
//       .stop()
//       .animate(
//         {
//           scrollTop: $target.offset().top - $(".navbar").outerHeight(true),
//         },
//         900,
//         "swing",
//         function () {
//           window.location.hash = target;
//         }
//       );
//   });
// });

// window.addEventListener("scroll", function () {
//   const offset = window.scrollY;
//   document.querySelector(".header").style.backgroundPositionY =
//     offset * 1 + "px";
//   document.querySelector(".section-games").style.backgroundPositionY =
//     offset * 1 + "px";
// });
// window.addEventListener("scroll", function () {
//   const offset = window.scrollY;

// });
