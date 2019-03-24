import {getRandomInt, getRandomFromArray, getRandomSetFromArray} from "./utils";

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
export const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];
export const WEEK_DAYS = [
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`
];

export const FILTERS_DATA = [
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

const titles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const tagsList = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`
];

const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const makeSomeTaskRepeating = () => {
  const days = {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  };

  if (Math.random() < 0.5) {
    const keys = Object.keys(days);
    const randomKey = getRandomFromArray(keys);
    days[randomKey] = true;
  }

  return days;

};


export const task = () => {
  return {
    title: getRandomFromArray(titles),
    dueDate: Date.now() + getRandomInt(-ONE_WEEK, ONE_WEEK),
    tags: getRandomSetFromArray(getRandomInt(0, 3), tagsList),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: getRandomFromArray(colors),
    repeatingDays: makeSomeTaskRepeating(),
    isFavorite: false,
    isDone: false,
  };
};

export const getTasksList = (qty) => {
  const tasksList = [];
  for (let i = 0; i <= qty - 1; i++) {
    tasksList.push(task());
  }

  return tasksList;
};
