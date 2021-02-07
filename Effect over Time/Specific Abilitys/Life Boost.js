if (game.user.targets.size == 0) {
  ui.notifications.warn('You must have an actor targeted.');
  return;
}

const targetId = game.user.targets.values().next().value.data._id;
const type = 'fast-healing';
const alertData = {
  name: `${targetId}:${type}`,
  label: 'Life Boost',
  endOfTurn: false,
  repeating: {
    frequency: 1,
    expire: 4,
  },
  args: [targetId, Math.ceil(actor.level / 2) * 2, type],
};

game.macros.getName('Apply Effect').execute(true, alertData);