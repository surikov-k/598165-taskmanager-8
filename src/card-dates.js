import {MONTHS} from "./data";
import {isTaskRepeating} from "./utils";

export default (task) => {

  const dueDate = new Date(task.dueDate);
  const dueDateString = dueDate.getDate() + ` ` + MONTHS[dueDate.getMonth()];
  const timePerfix = dueDate.getHours() <= 12 ? `AM` : `PM`;
  const hours = dueDate.getHours() <= 12 ? dueDate.getHours() : dueDate.getHours() - 12;
  const dueTime = `${hours}:${dueDate.getMinutes()} ${timePerfix}`;

  const fieldsetDisabled = isTaskRepeating(task) ? `disabled` : ``;

  const cardDates = `
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
        repeat:<span class="card__repeat-status">yes</span>
      </button>

      <fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-mo-4"
            name="repeat"
            value="mo"
          />
          <label class="card__repeat-day" for="repeat-mo-4"
            >mo</label
          >
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-tu-4"
            name="repeat"
            value="tu"
            checked
          />
          <label class="card__repeat-day" for="repeat-tu-4"
            >tu</label
          >
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-we-4"
            name="repeat"
            value="we"
          />
          <label class="card__repeat-day" for="repeat-we-4"
            >we</label
          >
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-th-4"
            name="repeat"
            value="th"
          />
          <label class="card__repeat-day" for="repeat-th-4"
            >th</label
          >
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-fr-4"
            name="repeat"
            value="fr"
            checked
          />
          <label class="card__repeat-day" for="repeat-fr-4"
            >fr</label
          >
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            name="repeat"
            value="sa"
            id="repeat-sa-4"
          />
          <label class="card__repeat-day" for="repeat-sa-4"
            >sa</label
          >
          <input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-su-4"
            name="repeat"
            value="su"
            checked
          />
          <label class="card__repeat-day" for="repeat-su-4"
            >su</label
          >
        </div>
      </fieldset>
    </div>
  `;
  return cardDates;
};
