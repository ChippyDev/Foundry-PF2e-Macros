function getItem(level, type) {
  if (level < 1) level = 1;
  const tableResult = game.tables.entities.find((t) => t.name === `Level ${level} ${type} Items`).roll().results[0];

  const chatTemplate = `<div class="table-draw"><ol class="table-results"><li class="table-result flexrow" data-result-id="${tableResult._id}"><img class="result-image" src="${tableResult.img}"><div class="result-text"><a class="entity-link" draggable="true" data-pack="${tableResult.collection}" data-id="${tableResult.resultId}"><i class="fas fa-suitcase"></i>${tableResult.text}</a></div></li></ol></div>`;
  return chatTemplate;
}

const qualityRoll = new Roll(`1d20`).roll();
const baseBoxLevel = -1;
let boxMod = 0;
let qualityContent = '';

if (qualityRoll.total == 20) {
  const bonusRoll = new Roll(`1d6 + ${baseBoxLevel} + ${boxMod}`).roll();
  qualityContent += `Roll: ${bonusRoll.dice[0].total}, Result: ${bonusRoll.total} Type: Permanent
  ${getItem(bonusRoll.total, 'Permanent')}`;
} else if (qualityRoll.total >= 18) {
  const bonusRoll = new Roll(`1d6 + ${baseBoxLevel} + ${boxMod} + 1`).roll();
  qualityContent += `Roll: ${bonusRoll.dice[0].total}, Result: ${bonusRoll.total} Type: Consumable
  ${getItem(bonusRoll.total, 'Consumable')}`;
} else if (qualityRoll.total == 1) {
  qualityContent += `no extra item (Quality Crit Fail)`;
} else {
  qualityContent += `no extra item`;
}

const levelRoll = new Roll(`1d6 + ${baseBoxLevel} + ${boxMod}`).roll();

ChatMessage.create({
  user: game.user.id,
  speaker: ChatMessage.getSpeaker(),
  whisper: game.users.entities.filter((u) => u.isGM).map((u) => u._id),
  content: `Quality: ${qualityRoll.total}, Base Lvl: ${baseBoxLevel}, Mod: ${boxMod}
  Roll: ${levelRoll.dice[0].total}, Result: ${levelRoll.total}
  ${getItem(levelRoll.total, 'Permanent')}${qualityContent}`,
});
