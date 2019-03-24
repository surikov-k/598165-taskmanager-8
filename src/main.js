import renderFilter from "./render-filter";
import {FILTERS_DATA, getTasksList} from "./data";
import {getRandomInt} from "./utils";
import {Task} from "./task";
import {TaskEdit} from "./task-edit";

const renderTasks = (totalTasks) => {
  const boardTasks = document.querySelector(`.board__tasks`);
  boardTasks.innerHTML = ``;

  const tasksList = getTasksList(totalTasks);
  for (const taskData of tasksList) {
    const task = new Task(taskData);
    const editTask = new TaskEdit(taskData);
    boardTasks.appendChild(task.render());
    task.onEdit = () => {
      editTask.render();
      boardTasks.replaceChild(editTask.element, task.element);
      task.unrender();
    };

    editTask.onSubmit = () => {
      task.render();
      boardTasks.replaceChild(task.element, editTask.element);
      editTask.unrender();
    };
  }

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
    renderTasks(getRandomInt(5, 18));
  });
});

renderTasks(7);
