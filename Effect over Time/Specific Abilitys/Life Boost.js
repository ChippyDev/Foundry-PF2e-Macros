if (game.user.targets.size == 0) {
  ui.notifications.warn('You must have an actor targeted.');
  return;
}

const targetid = game.user.targets.values().next().value.data._id;
const target = game.combat.combatants.find((c) => c.tokenId === targetid);
const type = 'fast-healing';

if (TurnAlert.getAlerts()) {
  if (TurnAlert.getAlertByName(`${targetid}:${type}`)) {
    ui.notifications.warn('Target is already rapidly healing.');
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

const amount = Math.ceil(actor.level / 2) * 2;

TurnAlert.create({
  name: `${targetid}:${type}`,
  label: 'Life Boost',
  turnId: target._id,
  repeating: {
    frequency: 1,
    expire: 4,
  },
  args: [targetid, amount, type],
  macro: 'Effect Tick',
});
game.macros.getName('Toggle Effect Icon').execute(targetid, type);
