export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomSetFromArray = (qty, array) => {
  qty = qty < array.length ? qty : array.length;
  const result = new Set();
  while (result.size < qty) {
    result.add(array[getRandomInt(0, array.length - 1)]);
  }
  return result;
};

export const getRandomFromArray = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

export const isTaskRepeating = (task) => {
  return Object.values(task.repeatingDays).some((it) => it) ? true : false;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
