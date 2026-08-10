const carousels = [
  {
    id: 1,
    title: "The Fall and the Wait",
    cards: [
      "c01_s01_title_fall_and_wait.png",
      "c01_s02_last_premier_league_day.png",
      "c01_s03_the_gap.png",
      "c01_s04_first_step_outside.png",
      "c01_s05_through_the_divisions.png",
      "c01_s06_rollercoaster_wdl.png"
    ]
  },
  {
    id: 2,
    title: "Life in Exile",
    cards: [
      "c02_s01_life_in_exile.png",
      "c02_s02_the_record_books.png",
      "c02_s03_dark_days_bright_days.png",
      "c02_s04_the_nearly_men.png",
      "c02_s05_constant_companions.png",
      "c02_s06_cup_record.png",
      "c02_s07_checkatrade_final.png",
      "c02_s08_the_goals.png",
      "c02_s09_goal_times.png",
      "c02_s10_cards_and_penalties.png"
    ]
  },
  {
    id: 3,
    title: "The People Who Carried It",
    cards: [
      "c03_s01_the_people_who_carried_it.png",
      "c03_s02_the_players.png",
      "c03_s03_one_match_wonders.png",
      "c03_s04_record_holders.png",
      "c03_s05_player_turnover.png",
      "c03_s06_the_leaders.png",
      "c03_s07_who_delivered.png",
      "c03_s08_mark_robins.png"
    ]
  },
  {
    id: 4,
    title: "Wherever They Played",
    cards: [
      "c04_s01_wherever_they_played.png",
      "c04_s02_home_is_where.png",
      "c04_s03_one_address.png",
      "c04_s04_displacement_years.png",
      "c04_s05_the_map.png",
      "c04_s06_the_miles.png",
      "c04_s07_the_fans.png"
    ]
  },
  {
    id: 5,
    title: "The Return",
    cards: [
      "c05_s01_the_return.png",
      "c05_s02_promotion_match.png",
      "c05_s03_final_season.png",
      "c05_s04_champions_2026.png",
      "c05_s05_we_are_back.png",
      "c05_s06_the_future.png"
    ]
  }
];


let currentCarouselIndex = null;
let currentCardIndex = 0;


const homeView = document.getElementById("homeView");
const viewerView = document.getElementById("viewerView");
const carouselGrid = document.getElementById("carouselGrid");

const homeButton = document.getElementById("homeButton");
const previousCarouselButton =
  document.getElementById("previousCarouselButton");
const nextCarouselButton =
  document.getElementById("nextCarouselButton");

const carouselLabel = document.getElementById("carouselLabel");
const carouselTitle = document.getElementById("carouselTitle");
const cardCounter = document.getElementById("cardCounter");
const cardFilename = document.getElementById("cardFilename");

const previousCardButton =
  document.getElementById("previousCardButton");
const nextCardButton =
  document.getElementById("nextCardButton");

const imageButton = document.getElementById("imageButton");
const cardImage = document.getElementById("cardImage");

const zoomModal = document.getElementById("zoomModal");
const zoomImage = document.getElementById("zoomImage");
const closeZoomButton =
  document.getElementById("closeZoomButton");



function cardUrl(filename) {
  return `cards/${filename}`;
}


function renderHome() {
  carouselGrid.innerHTML = "";

  carousels.forEach((carousel, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "carousel-card";

    const image = document.createElement("img");
    image.src = cardUrl(carousel.cards[0]);
    image.alt = `Carousel ${carousel.id}: ${carousel.title}`;

    const copy = document.createElement("div");
    copy.className = "carousel-card-copy";

    const label = document.createElement("div");
    label.className = "carousel-card-label";
    label.textContent =
      `Carousel ${carousel.id} · ${carousel.cards.length} cards`;

    const title = document.createElement("div");
    title.className = "carousel-card-title";
    title.textContent = carousel.title;

    copy.append(label, title);
    button.append(image, copy);

    button.addEventListener("click", () => {
      openCarousel(index, 0);
    });

    carouselGrid.appendChild(button);
  });
}


function showHome(updateHash = true) {
  currentCarouselIndex = null;
  currentCardIndex = 0;

  viewerView.classList.add("hidden");
  homeView.classList.remove("hidden");
  homeButton.classList.add("hidden");

  document.title = "CCFC Vault — The Exile Years QA";

  if (updateHash) {
    history.replaceState(
      null,
      "",
      `${window.location.origin}${window.location.pathname}#home`
    );
  }
}


function openCarousel(
  carouselIndex,
  cardIndex = 0,
  updateHash = true
) {
  if (
    carouselIndex < 0 ||
    carouselIndex >= carousels.length
  ) {
    return;
  }

  const carousel = carousels[carouselIndex];

  currentCarouselIndex = carouselIndex;
  currentCardIndex = Math.max(
    0,
    Math.min(cardIndex, carousel.cards.length - 1)
  );

  homeView.classList.add("hidden");
  viewerView.classList.remove("hidden");
  homeButton.classList.remove("hidden");

  renderCurrentCard();

  if (updateHash) {
    updateLocationHash();
  }
}


function renderCurrentCard() {
  if (currentCarouselIndex === null) {
    return;
  }

  const carousel = carousels[currentCarouselIndex];
  const filename = carousel.cards[currentCardIndex];

  carouselLabel.textContent =
    `Carousel ${carousel.id}`;

  carouselTitle.textContent =
    carousel.title;

  cardCounter.textContent =
    `Card ${currentCardIndex + 1} of ${carousel.cards.length}`;

  cardFilename.textContent =
    filename;

  cardImage.src =
    cardUrl(filename);

  cardImage.alt =
    `Carousel ${carousel.id}, card ${currentCardIndex + 1}`;

  previousCardButton.disabled =
    currentCardIndex === 0;

  nextCardButton.disabled =
    currentCardIndex === carousel.cards.length - 1;

  previousCarouselButton.disabled =
    currentCarouselIndex === 0;

  nextCarouselButton.disabled =
    currentCarouselIndex === carousels.length - 1;

  document.title =
    `C${carousel.id}.${currentCardIndex + 1} — ${carousel.title}`;

  updateLocationHash();
}


function updateLocationHash() {
  if (currentCarouselIndex === null) {
    return;
  }

  const carouselNumber = currentCarouselIndex + 1;
  const cardNumber = currentCardIndex + 1;

  history.replaceState(
    null,
    "",
    `${window.location.origin}${window.location.pathname}#c${carouselNumber}-s${cardNumber}`
  );
}


function previousCard() {
  if (
    currentCarouselIndex !== null &&
    currentCardIndex > 0
  ) {
    currentCardIndex -= 1;
    renderCurrentCard();
  }
}


function nextCard() {
  if (currentCarouselIndex === null) {
    return;
  }

  const carousel = carousels[currentCarouselIndex];

  if (currentCardIndex < carousel.cards.length - 1) {
    currentCardIndex += 1;
    renderCurrentCard();
  }
}


function previousCarousel() {
  if (
    currentCarouselIndex !== null &&
    currentCarouselIndex > 0
  ) {
    openCarousel(currentCarouselIndex - 1, 0);
  }
}


function nextCarousel() {
  if (
    currentCarouselIndex !== null &&
    currentCarouselIndex < carousels.length - 1
  ) {
    openCarousel(currentCarouselIndex + 1, 0);
  }
}


function openZoom() {
  if (currentCarouselIndex === null) {
    return;
  }

  const carousel = carousels[currentCarouselIndex];
  const filename = carousel.cards[currentCardIndex];

  zoomImage.src = cardUrl(filename);
  zoomImage.alt = cardImage.alt;

  zoomModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}


function closeZoom() {
  zoomModal.classList.add("hidden");
  document.body.style.overflow = "";
}



function loadFromHash() {
  const hash = window.location.hash.toLowerCase();

  if (!hash || hash === "#home") {
    showHome(false);
    return;
  }

  const match = hash.match(/^#c(\d+)-s(\d+)$/);

  if (!match) {
    showHome(false);
    return;
  }

  const carouselIndex =
    Number(match[1]) - 1;

  const cardIndex =
    Number(match[2]) - 1;

  if (
    carouselIndex < 0 ||
    carouselIndex >= carousels.length
  ) {
    showHome(false);
    return;
  }

  openCarousel(
    carouselIndex,
    cardIndex,
    false
  );
}


homeButton.addEventListener(
  "click",
  () => showHome()
);

previousCarouselButton.addEventListener(
  "click",
  previousCarousel
);

nextCarouselButton.addEventListener(
  "click",
  nextCarousel
);

previousCardButton.addEventListener(
  "click",
  previousCard
);

nextCardButton.addEventListener(
  "click",
  nextCard
);

imageButton.addEventListener(
  "click",
  openZoom
);

closeZoomButton.addEventListener(
  "click",
  closeZoom
);






zoomModal.addEventListener(
  "click",
  event => {
    if (event.target === zoomModal) {
      closeZoom();
    }
  }
);




document.addEventListener(
  "keydown",
  event => {

    if (!zoomModal.classList.contains("hidden")) {
      if (event.key === "Escape") {
        closeZoom();
      }
      return;
    }


    if (currentCarouselIndex === null) {
      return;
    }

    if (event.key === "ArrowLeft") {
      previousCard();
    }

    if (event.key === "ArrowRight") {
      nextCard();
    }

    if (event.key === "Escape") {
      showHome();
    }
  }
);


window.addEventListener(
  "hashchange",
  loadFromHash
);


renderHome();
loadFromHash();
