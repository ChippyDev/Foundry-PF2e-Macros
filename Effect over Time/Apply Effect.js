// args[0] = Add/Remove
// args[1] = alertdata

const target = game.combat.combatants.find((c) => c.tokenId === args[1].args[0]);

if (TurnAlert.getAlerts()) {
  if (TurnAlert.getAlertByName(args[1].name)) {
    ui.notifications.warn(`Target already has a ${args[1].args[2]} effect.`);
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

args[1].turnId = target._id;
args[1].macro = 'Effect Tick';

TurnAlert.create(args[1]);
game.macros.getName('Toggle Effect Icon').execute(args[1].args[0], args[1].args[2], true);
