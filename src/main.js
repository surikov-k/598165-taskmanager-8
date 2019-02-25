import renderFilter from "./render-filter";
import renderCard from "./render-card";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const FILTERS_DATA = [
  {
    name: `ALL`,
    count: getRandomInt(5, 15)
  },
  {
    name: `OVERDUE`,
    count: getRandomInt(0, 2)
  },
  {
    name: `TODAY`,
    count: getRandomInt(0, 1)
  },
  {
    name: `FAVORITES`,
    count: getRandomInt(0, 7)
  },
  {
    name: `REPEATING`,
    count: getRandomInt(1, 2)
  },
  {
    name: `TAGS`,
    count: getRandomInt(1, 5)
  },
  {
    name: `ARCHIVE`,
    count: getRandomInt(100, 150)
  },
];

const renderCards = (totalCatds) => {
  const cardsFragment = document.createDocumentFragment();
  for (let i = 0; i <= totalCatds - 1; i++) {
    cardsFragment.appendChild(renderCard(COLORS[getRandomInt(0, 4)]));
  }

  const boardTasks = document.querySelector(`.board__tasks`);
  boardTasks.innerHTML = ``;
  boardTasks.appendChild(cardsFragment);
};

const filterFragment = document.createDocumentFragment();
FILTERS_DATA.forEach((it) => {
  filterFragment.appendChild(renderFilter(it.name, it.count));
});


const filterContainer = document.querySelector(`.main__filter`);
filterContainer.innerHTML = ``;
filterContainer.appendChild(filterFragment);
document.querySelector(`#filter__all`).checked = true;

const filterInputs = document.querySelectorAll(`.filter__input`);
filterInputs.forEach((it) => {
  it.addEventListener(`click`, () => {
    renderCards(getRandomInt(5, 18));
  });
});

renderCards(7);
