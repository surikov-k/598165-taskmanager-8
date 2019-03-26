import {MONTHS} from "./data";
import {Component} from "./component";

export class TaskEdit extends Component {
  constructor(task) {
    super();
    this._title = task.title;
    this._dueDate = task.dueDate;
    this._tags = task.tags;
    this._picture = task.picture;
    this._color = task.color;
    this._repeatingDays = task.repeatingDays;
    this._isFavorite = task.isFavorite;
    this._isDone = task.isDone;
    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _taskClassList() {
    const repeatClass = this._isRepeating() ? `card--repeat` : ``;
    return `card card--edit card--${this._color} ${repeatClass}`;
  }


  _taskDates() {
    const dueDate = new Date(this._dueDate);
    const dueDateString = dueDate.getDate() + ` ` + MONTHS[dueDate.getMonth()];
    const timePostfix = dueDate.getHours() <= 12 ? `AM` : `PM`;
    const hours = dueDate.getHours() <= 12 ? dueDate.getHours() : dueDate.getHours() - 12;
    const dueTime = `${hours}:${dueDate.getMinutes()} ${timePostfix}`;

    const fieldsetDisabled = this._isRepeating(this) ? `disabled` : ``;

    const renderRepeatingDays = () => {
      return Object.keys(this._repeatingDays).reduce((template, day) => {
        return template + `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-4"
        name="repeat"
        value=${day}"
        ${this._repeatingDays[day] ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}-4">
        ${day}
      </label>`;
      }, ``);
    };

    return `
      <div class="card__dates">
        <button class="card__date-deadline-toggle" type="button">
          date: <span class="card__date-status">yes</span>
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
              placeholder="${dueTime}"
              name="time"
              value="${dueTime}"
            />
          </label>
        </fieldset>

        <button class="card__repeat-toggle" type="button">
          repeat:<span class="card__repeat-status">
          ${this._isRepeating() ? `yes` : `no`}
          </span>
        </button>

        <fieldset class="card__repeat-days">
          <div class="card__repeat-days-inner">
            ${renderRepeatingDays()}
          </div>
        </fieldset>
      </div>`;
  }

  _cardHashtags() {
    const tagList = [...this._tags].reduce((template, tag) => {
      return template + `
      <span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="repeat"
          class="card__hashtag-hidden-input"
        />
        <button type="button" class="card__hashtag-name">
          #${tag}
        </button>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>
    `;
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
  }

  _taskImage() {
    const labelClassList = this._isRepeating() ? `card__img-wrap card__img-wrap--empty` : `card__img-wrap`;

    return `
      <label class="${labelClassList}">
        <input
          type="file"
          class="card__img-input visually-hidden"
          name="img"
        />
        <img
          src="${this._picture}"
          alt="task picture"
          class="card__img"
        />
      </label>`;
  }

  get template() {
    return `
      <article class="${this._taskClassList()}">
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
                >${this._title}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                ${this._taskDates()}
                ${this._cardHashtags()}
              </div>
              ${this._taskImage()}

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-4"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
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
                    checked
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
  }

  bind() {
    this._element.querySelector(`.card__form`)
        .addEventListener(`submit`, this._onSubmitButtonClick
          .bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick
          .bind(this));
  }

}

