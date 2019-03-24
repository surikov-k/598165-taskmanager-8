import {MONTHS} from "./data";
import {createElement} from "./utils";

export class Task {
  constructor(task) {
    this._title = task.title;
    this._dueDate = task.dueDate;
    this._tags = task.tags;
    this._picture = task.picture;
    this._color = task.color;
    this._repeatingDays = task.repeatingDays;
    this._isFavorite = task.isFavorite;
    this._isDone = task.isDone;

    this._element = null;
    this._state = {
    };
    this._onEdit = null;
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _taskClassList() {
    const repeatClass = this._isRepeating() ? `card--repeat` : ``;
    return `card card--${this._color} ${repeatClass}`;
  }

  _taskDates() {
    const dueDate = new Date(this._dueDate);
    const dueDateString = dueDate.getDate() + ` ` + MONTHS[dueDate.getMonth()];
    const timePostfix = dueDate.getHours() <= 12 ? `AM` : `PM`;
    const hours = dueDate.getHours() <= 12 ? dueDate.getHours() : dueDate.getHours() - 12;
    const dueTime = `${hours}:${dueDate.getMinutes()} ${timePostfix}`;

    const fieldsetDisabled = this._isRepeating(this) ? `disabled` : ``;

    return `
      <div class="card__dates">

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
            </div>
          </div>
      </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
        .addEventListener(`click`, this._onEditButtonClick
          .bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  render() {
    if (this._element) {
      this._element = null;
    }
    this._element = createElement(this.template);

    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
