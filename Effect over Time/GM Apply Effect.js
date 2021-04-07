if (!token) {
  ui.notifications.warn('You must have an actor selected.');
  return;
}

const applyChanges = ($html) => {
  const targetid = token.data._id;
  const damage = $html.find('[name="damage"]').val() || 0;
  const type = $html.find('[name="type"]')[0].value || 'null';
  const endOfTurn = $html.find('[name="endOfTurn"]')[0].checked;
  if (damage == 0) return;

  const alertData = {
    name: `${targetid}:${type}`,
    label: `GM Effect: ${damage} ${type}`,
    endOfTurn: endOfTurn,
    repeating: {
      frequency: 1,
    },
    args: [targetid, damage, type],
  };

  game.macros.getName('Apply Effect').execute(true, alertData);
};

new Dialog({
  title: 'Enter Damage Formula',
  content: `
  <form>
  <div class="form-group">
    <label>Amount:</label>
    <input id="damage" name="damage" type="string" />
  </div>
  <div class="form-group">
    <label>Type:</label>
    <select id="type" name="type">
      <option value="bleed">Bleed</option>
      <option value="acid">Acid</option>
      <option value="fire">Fire</option>
      <option value="fast-healing">Fast healing</option>
      <option value="regen">Regen</option>
    </select>
  </div>
  <div class="form-group">
    <label>End of Turn:</label>
    <input checked type="checkbox" name="endOfTurn" />
  </div>
</form>
`,
  buttons: {
    yes: {
      icon: `<i class="fas fa-check"></i>`,
      label: 'Apply',
      callback: applyChanges,
    },
    no: {
      icon: `<i class="fas fa-times"></i>`,
      label: 'Cancel',
    },
  },
  default: 'no',
}).render(true);
