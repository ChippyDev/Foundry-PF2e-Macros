async function main() {
  const icon = 'icons/equipment/shield/heater-steel-grey.webp';
  let messageContent, target;
  if (args[0]) {
    target = canvas.tokens.get(args[0]);
  } else {
    if (!actor) {
      ui.notifications.warn('You must have an actor selected.');
      return;
    }
    target = token;
  }

  const shield = target.actor.data.items
    .filter((item) => item.type === 'armor')
    .filter((armor) => armor.data.armorType.value === 'shield')
    .find((shield) => shield.data.equipped.value);
  if (shield) {
    if (target.data.effects.includes(icon)) {
      await target.actor.removeCustomModifier('ac', 'Raised Shield');
      target.toggleEffect(icon);
      messageContent = 'Lowers their shield';
      if (game.combat) {
        const alertId = TurnAlert.getAlertByName(`${target.data._id}:shield`);
        if (alertId) TurnAlert.delete(game.combat._id, alertId.id);
      }
    } else {
      await target.actor.addCustomModifier('ac', 'Raised Shield', Number(shield.data.armor.value), 'circumstance');
      target.toggleEffect(icon);
      messageContent = 'Raises their shield';
      if (game.combat) {
        TurnAlert.create({
          name: `${target.data._id}:shield`,
          label: `Raised Shield`,
          round: 1,
          turnId: game.combat.combatants.find((c) => c.tokenId === target.data._id)._id,
          macro: 'Better Shield',
          args: [target.data._id],
        });
      }
    }
  } else {
    ui.notifications.warn('You must have a shield equipped.');
    return;
  }

  ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: messageContent,
  });
}
main();
