export default (task) => {

  const tagList = [...task.tags].reduce((template, tag) => {
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

  const cardHashtags = `
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

  return cardHashtags;
};
