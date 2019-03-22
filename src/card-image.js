import {isTaskRepeating} from "./utils";

export default (task) => {
  const labelClassList = isTaskRepeating(task) ? `card__img-wrap card__img-wrap--empty` : `card__img-wrap`;

  const cardImage = `
    <label class="${labelClassList}">
      <input
        type="file"
        class="card__img-input visually-hidden"
        name="img"
      />
      <img
        src="${task.picture}"
        alt="task picture"
        class="card__img"
      />
    </label>
  `;

  return cardImage;
};
