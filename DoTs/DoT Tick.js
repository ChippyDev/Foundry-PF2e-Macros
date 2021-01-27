// args[0] = Target's token id
// args[1] = The damage formula
// args[2] = The damage type
function main() {
  const targetToken = canvas.tokens.get(args[0]);
  const targetHP = targetToken.actor.data.data.attributes.hp.value;

  const dieRoll = new Roll(`${args[1]}`).roll();

  ChatMessage.create(
    {
      user: game.user.id,
      type: CHAT_MESSAGE_TYPES.ROLL,
      flavor: `<strong>${targetToken.actor.data.name} takes persistant ${args[2]} damage</strong>`,
      roll: dieRoll,
      speaker: ChatMessage.getSpeaker(),
    },
    {}
  );
  if (args[2] == 'healing') {
    targetToken.actor.update({ 'data.attributes.hp.value': targetHP + dieRoll.total });
  } else {
    targetToken.actor.update({ 'data.attributes.hp.value': targetHP - dieRoll.total });
  }
}

const delay = args[2] == 'bleed' ? 0 : args[2] == 'acid' ? 250 : args[2] == 'fire' ? 500 : args[2] == 'healing' ? 750 : 1000;

setTimeout(main, delay);
