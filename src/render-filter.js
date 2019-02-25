export default (name, count) => {
  const status = !count ? `disabled` : ``;
  const filterId = `filter__${name.toLowerCase()}`;

  const templateText = `
    <input
      type="radio"
      id="${filterId}"
      class="filter__input visually-hidden"
      name="filter"
      ${status}
    />
    <label for="${filterId}" class="filter__label">
      ${name.toUpperCase()} <span class="${filterId}-count">${count}</span></label
    >
  `;
  const template = document.createElement(`template`);
  template.innerHTML = templateText;

  return template.content;
};
