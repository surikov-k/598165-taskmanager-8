import renderFilter from "./render-filter";
import renderCard from "./render-card";
import {FILTERS_DATA, getTasksList} from "./data";
import {getRandomInt} from "./utils";

const renderCards = (totalCatds) => {
  const cardsFragment = document.createDocumentFragment();
  const tasksList = getTasksList(totalCatds);
  for (const task of tasksList) {
    cardsFragment.appendChild(renderCard(task));
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
