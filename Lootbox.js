// Average party level
const APL = 4;
// Min Level modifier
let boxMod = 0;

function getItem(level, type) {
  if (level < 1) return;
  const tableResult = game.tables.entities.find((t) => t.name === `Level ${level} ${type} Items`).roll().results[0];

  const chatTemplate = `<div class="table-draw"><ol class="table-results"><li class="table-result flexrow" data-result-id="${tableResult._id}"><img class="result-image" src="${tableResult.img}"><div class="result-text"><a class="entity-link" draggable="true" data-pack="${tableResult.collection}" data-id="${tableResult.resultId}"><i class="fas fa-suitcase"></i>${tableResult.text}</a></div></li></ol></div>`;
  return chatTemplate;
}

const qualityRoll = new Roll(`1d20`).roll();

let BoxLevel = APL - 5;
const dieClass = BoxLevel >= 0 ? 6 : 6 + BoxLevel;
if (BoxLevel < 0) BoxLevel = 0

let qualityContent = '';

if (qualityRoll.total == 20) {
  const bonusRoll = new Roll(`1d${dieClass} + ${BoxLevel} + ${boxMod}`).roll();
  qualityContent += `Roll: ${bonusRoll.dice[0].total}, Result: ${bonusRoll.total} Type: Permanent
  ${getItem(bonusRoll.total, 'Permanent')}`;
} else if (qualityRoll.total >= 18) {
  const bonusRoll = new Roll(`1d${dieClass} + ${BoxLevel} + ${boxMod} + 1`).roll();
  qualityContent += `Roll: ${bonusRoll.dice[0].total}, Result: ${bonusRoll.total} Type: Consumable
  ${getItem(bonusRoll.total, 'Consumable')}`;
} else if (qualityRoll.total == 1) {
  qualityContent += `no extra item (Quality Crit Fail)`;
} else {
  qualityContent += `no extra item`;
}

const levelRoll = new Roll(`1d${dieClass} + ${BoxLevel} + ${boxMod}`).roll();
const DebugText1 = `Die: d${dieClass}, `
const DebugText2 = `Min Lvl: ${APL - 5}, `

ChatMessage.create({
  user: game.user.id,
  speaker: ChatMessage.getSpeaker(),
  whisper: game.users.entities.filter((u) => u.isGM).map((u) => u._id),
  content: `Quality: ${qualityRoll.total}, APL: ${APL}, ${dieClass == 6 ? DebugText2 : DebugText1}
  Roll: ${levelRoll.dice[0].total}, Mod: ${boxMod}, Result: [[${levelRoll.dice[0].total} + ${BoxLevel} + ${boxMod}]]
  ${getItem(levelRoll.total, 'Permanent')}${qualityContent}`,
});
