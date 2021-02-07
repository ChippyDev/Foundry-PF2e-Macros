if (game.user.targets.size == 0) {
  ui.notifications.warn('You must have an actor targeted.');
  return;
}

const applyChanges = ($html) => {
  const targetid = game.user.targets.values().next().value.data._id;
  const type = 'bleed';
  const damage = $html.find('[name="damage"]').val() || 0;
  if (damage == 0) return;

  const alertData = {
    name: `${targetid}:${type}`,
    label: 'Blood Vendetta',
    endOfTurn: true,
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
<label>Damage:</label>
<input id="damage" name="damage" type="string"/>
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