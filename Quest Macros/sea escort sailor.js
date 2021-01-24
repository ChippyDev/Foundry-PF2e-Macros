const targetid = token.data._id;
game.macros.getName('Toggle Conditions').execute(targetid, 'Flat-Footed');

const alertData1 = {
  name: `${token.name}`,
  label: `${token.name}'s Reset`,
  round: 2,
  message: `${token.name}'s Ready!`,
  macro: 'Toggle Conditions',
  args: [targetid, 'Flat-Footed'],
};

const alertData2 = {
  name: `${token.name}trigger`,
  label: `${token.name}'s Tiggering Device`,
  round: 0,
  endOfTurn: true,
  turnId: game.combat.combatant._id,
  message: `${token.name} trigger's the device`,
};

TurnAlert.create(alertData1);
TurnAlert.create(alertData2);
