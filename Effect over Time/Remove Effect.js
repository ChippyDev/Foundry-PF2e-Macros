if (!token) {
  ui.notifications.warn('You must have an actor selected.');
  return;
}

const alertArray = TurnAlert.getAlerts().filter(
  (c) => c.turnId === game.combat.combatants.find((c) => c.tokenId === token.data._id)._id
);

if (alertArray.length == 0) {
  ui.notifications.warn('Actor has no Effects.');
  return;
}

let options = '';
for (let x = 0; x < alertArray.length; x++) {
  options += `<option value="${alertArray[x].args[2]}">${alertArray[x].label}</option>\n`;
}

const applyChanges = ($html) => {
  const type = $html.find('[name="type"]')[0].value || 'null';
  const alertId = TurnAlert.getAlertByName(`${token.data._id}:${type}`).id;

  game.macros.getName('Toggle Effect Icon').execute(token.data._id, type, false);
  TurnAlert.delete(game.combat._id, alertId);
};

const dialog = new Dialog({
  title: 'Select Effecta',
  content: `
<form>
<div class="form-group"> 
<select id="type" name="type">
${options}
</select>
</div>
</form>
`,
  buttons: {
    yes: {
      icon: `<i class="fas fa-check"></i>`,
      label: 'Delete',
      callback: applyChanges,
    },
    no: {
      icon: `<i class="fas fa-times"></i>`,
      label: 'Cancel',
    },
  },
  default: 'no',
});
dialog.render(true);
