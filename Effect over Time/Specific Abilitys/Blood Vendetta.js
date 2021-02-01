if (game.user.targets.size == 0) {
  ui.notifications.warn('You must have an actor targeted.');
  return;
}

const targetid = game.user.targets.values().next().value.data._id;
const target = game.combat.combatants.find((c) => c.tokenId === targetid);
const type = 'bleed';

if (TurnAlert.getAlerts()) {
  if (TurnAlert.getAlertByName(`${targetid}:${type}`)) {
    ui.notifications.warn('Target is already bleeding.');
    return;
  }
} else {
  TurnAlert.create({
    name: 'Alert Initialization',
    label: 'Alert Initialization',
  });
}

if (target == undefined) {
  ui.notifications.warn('Target isnt in combat');
  return;
}

const applyChanges = ($html) => {
  const damage = $html.find('[name="damage"]').val() || 0;
  if (damage == 0) return;

  const alertData = {
    name: `${targetid}:${type}`,
    label: 'Blood Vendetta',
    round: 0,
    roundAbsolute: false,
    turnId: target._id,
    endOfTurn: true,
    repeating: {
      frequency: 1,
    },
    args: [targetid, damage, type],
    macro: 'Effect Tick',
  };

  TurnAlert.create(alertData);
  game.macros.getName('Toggle Effect Icon').execute(targetid, type);
};

const dialog = new Dialog({
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
});
dialog.render(true);