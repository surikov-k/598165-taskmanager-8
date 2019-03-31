import moment from "moment";

const getTaskClassList = (task) => {
  const repeatClass = isTaskRepeating(task) ? `card--repeat` : ``;
  return `card card--edit card--${task._color} ${repeatClass}`;
};

const isTaskRepeating = (task) => {
  return Object.values(task._repeatingDays).some((it) => it === true);
};

const getTaskImage = (task) => {
  const labelClassList = isTaskRepeating(task) ? `card__img-wrap card__img-wrap--empty` : `card__img-wrap`;

  return `
      <label class="${labelClassList}">
        <input
          type="file"
          class="card__img-input visually-hidden"
          name="img"
        />
        <img
          src="${task._picture}"
          alt="task picture"
          class="card__img"
        />
      </label>`;
};

const getTaskHashtags = (task) => {
  const tagList = [...task._tags].reduce((template, tag) => {
    return template + `
      <span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="${tag}"
          class="card__hashtag-hidden-input"
        />
        <button type="button" class="card__hashtag-name">
          #${tag}
        </button>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>
    `.trim();
  }, ``);

  return `
  <div class="card__hashtag">
    <div class="card__hashtag-list">
      ${tagList}
    </div>

    <label>
      <input
        type="text"
        class="card__hashtag-input"
        name="hashtag-input"
        placeholder="Type new hashtag here"
      />
    </label>
  </div>`;
};

const getTaskDates = (task) => {
  const dueDate = new Date(task._dueDate);
  const dueDateString = moment(dueDate).format(`D MMMM`);
  const dueTimeString = `${moment(dueDate).format(`h:mm`)} ${moment(dueDate).format(`a`).toUpperCase()}`;

  const fieldsetDisabled = isTaskRepeating(task) ? `disabled` : ``;

  return `
      <div class="card__dates">
        <button class="card__date-deadline-toggle" type="button">
          date: <span class="card__date-status">${task._state.hasDate ? `yes` : `no`}</span>
        </button>

        <fieldset class="card__date-deadline" ${fieldsetDisabled}>
          <label class="card__input-deadline-wrap">
            <input
              class="card__date"
              type="text"
              placeholder="${dueDateString}"
              name="date"
              value="${dueDateString}"
            />
          </label>
          <label class="card__input-deadline-wrap">
            <input
              class="card__time"
              type="text"
              placeholder="${dueTimeString}"
              name="time"
              value="${dueTimeString}"
            />
          </label>
        </fieldset>

        <button class="card__repeat-toggle" type="button">
          repeat:<span class="card__repeat-status">
          ${isTaskRepeating(task) ? `yes` : `no`}
          </span>
        </button>

        <fieldset class="card__repeat-days">
          <div class="card__repeat-days-inner">
            ${getRepeatingDays(task)}
          </div>
        </fieldset>
      </div>`;
};

const getRepeatingDays = (task) => {
  return Object.keys(task._repeatingDays).reduce((template, day) => {
    return template + `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-4"
        name="repeat"
        value="${day}"
        ${task._repeatingDays[day] ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}-4">
        ${day}
      </label>`;
  }, ``);
};

export const getTaskEditTemplate = (task) => {
  return `<article class="${getTaskClassList(task)}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites card__btn--disabled"
              >
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${task._title}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                ${getTaskDates(task)}
                ${getTaskHashtags(task)}
              </div>
              ${getTaskImage(task)}

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-4"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
                    ${task._color === `black` && `checked`}
                  />
                  <label
                    for="color-black-4"
                    class="card__color card__color--black"
                    >black</label
                  >
                  <input
                    type="radio"
                    id="color-yellow-4"
                    class="card__color-input card__color-input--yellow visually-hidden"
                    name="color"
                    value="yellow"
                    ${task._color === `yellow` && `checked`}
                  />
                  <label
                    for="color-yellow-4"
                    class="card__color card__color--yellow"
                    >yellow</label
                  >
                  <input
                    type="radio"
                    id="color-blue-4"
                    class="card__color-input card__color-input--blue visually-hidden"
                    name="color"
                    value="blue"
                    ${task._color === `blue` && `checked`}

                  />
                  <label
                    for="color-blue-4"
                    class="card__color card__color--blue"
                    >blue</label
                  >
                  <input
                    type="radio"
                    id="color-green-4"
                    class="card__color-input card__color-input--green visually-hidden"
                    name="color"
                    value="green"
                    ${task._color === `green` && `checked`}
                  />
                  <label
                    for="color-green-4"
                    class="card__color card__color--green"
                    >green</label
                  >
                  <input
                    type="radio"
                    id="color-pink-4"
                    class="card__color-input card__color-input--pink visually-hidden"
                    name="color"
                    value="pink"
                    ${task._color === `pink` && `checked`}
                  />
                  <label
                    for="color-pink-4"
                    class="card__color card__color--pink"
                    >pink</label
                  >
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`.trim();
};
