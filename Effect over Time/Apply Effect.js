// args[0] = Add/Remove
// args[1] = alertdata
//  args[1].args[0] = Target token id
//  args[1].args[1] = Formula
//  args[1].args[2] = Type

if (TurnAlert.getAlerts()) {
  if (TurnAlert.getAlertByName(args[1].name)) {
    const CurrentAlert = TurnAlert.getAlertByName(args[1].name);
    const currentDamage = new Roll(CurrentAlert.args[1]).evaluate({ maximize: true });
    const newDamage = new Roll(args[1].args[1]).evaluate({ maximize: true });
    if (newDamage.total > currentDamage.total) {
      TurnAlert.delete(game.combat._id, CurrentAlert.id);
      ui.notifications.info(
        `Old ${args[1].args[2]} effect overwritten due to having lower total ${
          args[1].args[2] == 'fast-healing' || args[1].args[2] == 'regen' ? 'healing' : 'damage'
        }.`
      );
    } else {
      ui.notifications.warn(`The target already has a better ${args[1].args[2]} effect.`);
      return;
    }
  }
} else {
  TurnAlert.create({
    name: 'Alert Initialization',
    label: 'Alert Initialization',
  });
}

if (!game.combat.combatants.find((c) => c.tokenId === args[1].args[0])) {
  await game.combat.createCombatant({ tokenId: args[1].args[0], hidden: true, initiative: 0});
}

const target = game.combat.combatants.find((c) => c.tokenId === args[1].args[0]);

args[1].turnId = target._id;
args[1].macro = 'Effect Tick';

TurnAlert.create(args[1]);
game.macros.getName('Toggle Effect Icon').execute(args[1].args[0], args[1].args[2], true);
