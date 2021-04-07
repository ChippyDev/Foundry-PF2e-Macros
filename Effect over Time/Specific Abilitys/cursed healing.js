if (actor) {
  const targetid = token.data._id;
  const type = 'fast-healing';
  if ((token.actor.data.data.customModifiers['ac'] || []).some((modifier) => modifier.name === 'Moderate Curse')) {
    await actor.removeCustomModifier('ac', 'Moderate Curse');
    await actor.removeCustomModifier('damage', 'Moderate Curse');
    if (token.data.effects.includes('icons/commodities/treasure/token-white-skull.webp')) {
      token.toggleEffect('icons/commodities/treasure/token-white-skull.webp');
    }
    if (game.comba) {
      const alertId = TurnAlert.getAlertByName(`${targetid}:${type}`).id;
      TurnAlert.delete(game.combat._id, alertId);
      game.macros.getName('Toggle Effect Icon').execute(token.data._id, type, false);
    }
  } else {
    await actor.addCustomModifier('ac', 'Moderate Curse', -1, 'penalty');
    await actor.addCustomModifier('damage', 'Moderate Curse', 2, 'status');
    if (!token.data.effects.includes('icons/commodities/treasure/token-white-skull.webp')) {
      token.toggleEffect('icons/commodities/treasure/token-white-skull.webp');
    }
    if (game.combat) {
      const alertData = {
        name: `${targetid}:${type}`,
        label: 'Cursed Healing',
        endOfTurn: false,
        repeating: {
          frequency: 1,
        },
        args: [targetid, Math.ceil(actor.level / 2), type],
      };

      game.macros.getName('Apply Effect').execute(true, alertData);
    }
  }
} else {
  ui.notifications.warn('You must have an actor selected.');
}
