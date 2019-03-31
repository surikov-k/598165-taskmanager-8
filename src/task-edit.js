import {
  Component
} from "./component";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import {
  getTaskEditTemplate
} from "./task-template";


export class TaskEdit extends Component {
  constructor(task) {
    super();
    this._title = task.title;
    this._dueDate = task.dueDate;
    this._tags = task.tags;
    this._picture = task.picture;
    this._color = task.color;
    this._repeatingDays = task.repeatingDays;
    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._state.hasDate = this._dueDate ? true : false;
    this._state.isRepeating = false;

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeating = this._onChangeRepeating.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };
    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _onChangeDate() {
    this._state.hasDate = !this._state.hasDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeating() {
    this._state.isRepeating = !this._state.isRepeating;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this.element.innerHTML = this.template;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
    return getTaskEditTemplate(this);
  }

  bind() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeating);
    if (this._state.hasDate) {
      flatpickr(this._element.querySelector(`.card__date`), {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`
      });
      flatpickr(this._element.querySelector(`.card__time`), {
        noCalendar: true,
        enableTime: true
      });
    }

  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeating);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => {
        target.dueDate = new Date(value).getTime();
      }
    };
  }
}
