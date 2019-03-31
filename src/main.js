import renderFilter from "./render-filter";
import {FILTERS_DATA, getTasksList} from "./data";
import {getRandomInt} from "./utils";
import {Task} from "./task";
import {TaskEdit} from "./task-edit";

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


const boardTasks = document.querySelector(`.board__tasks`);

const renderTasks = (amount) => {
  boardTasks.innerHTML = ``;
  const tasksList = getTasksList(amount);
  for (const task of tasksList) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);
    boardTasks.appendChild(taskComponent.render());

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;

      taskComponent.update(task);
      taskComponent.render();
      boardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };
  }
};
renderTasks(7);

