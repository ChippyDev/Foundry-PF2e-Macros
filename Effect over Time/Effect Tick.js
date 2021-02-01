// args[0] = Target's token id
// args[1] = The damage formula
// args[2] = The damage type
function main() {
  const targetToken = canvas.tokens.get(args[0]);
  const alrt = TurnAlert.getAlertByName(`${args[0]}:${args[2]}`);
  const targetHP = targetToken.actor.data.data.attributes.hp.value;
  let messageContent;

  const dieRoll = new Roll(`${args[1]}`).roll();

  if (args[2] == 'fast-healing' || args[2] == 'regen') {
    targetToken.actor.update({ 'data.attributes.hp.value': targetHP + dieRoll.total });
    if (args[2] == 'fast-healing') {
      messageContent = 'Rapidly Heals';
    } else {
      messageContent = 'Regenerates';
    }
  } else {
    targetToken.actor.update({ 'data.attributes.hp.value': targetHP - dieRoll.total });
    messageContent = `takes persistant ${args[2]} damage`;
  }

  ChatMessage.create({
    user: game.user.id,
    type: CHAT_MESSAGE_TYPES.ROLL,
    flavor: `<strong>${targetToken.actor.data.name} ${messageContent}</strong>`,
    roll: dieRoll,
    speaker: ChatMessage.getSpeaker(),
  });

  if (alrt.repeating.expire) {
    console.log(`${alrt.createdRound + alrt.repeating.expire} R ${game.combat.round}`);
    if (alrt.createdRound + alrt.repeating.expire <= game.combat.round) {
      game.macros.getName('Toggle Effect Icon').execute(args[0], args[2]);
    }
  }
}

const alertArray = TurnAlert.getAlerts().filter(
  (c) => c.turnId === game.combat.combatants.find((c) => c.tokenId === args[0])._id
);
const delay = alertArray.indexOf(alertArray.find((c) => c.name == `${args[0]}:${args[2]}`)) * 200;

setTimeout(main, delay);
