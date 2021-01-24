const canRisk = actor.items.find((c) => c.name === 'Risky Surgery') !== null;
const canNature = actor.items.find((c) => c.name === 'Natural Medicine') !== null;

const rollTreatWounds = async ({ DC, healBonus, med, rollmod, risky, nature }) => {
  if (risky === true) {
    rollmod += 2;
  }

  const checkRoll = new Roll(`1d20 + ${med.value} + ${rollmod}`).roll();
  ChatMessage.create({
    user: game.user.id,
    type: CHAT_MESSAGE_TYPES.ROLL,
    roll: checkRoll,
    flavor: `<strong>Treat Wounds: ${nature == true ? 'Nature' : 'Medicine'}</strong> (DC ${DC})`,
    speaker: ChatMessage.getSpeaker(),
  });

  const success = checkRoll.total >= DC + 10 ? 2 
                : checkRoll.total >= DC ? 1 
                : checkRoll.total <= DC - 10 ? -1 
                : 0;

  let healFormula, successLabel;
  const bonusString = healBonus > 0 ? `+ ${healBonus}` : '';
  if (success > 1 || (risky === true && success === 1)) {
    healFormula = `4d8${bonusString}`;
    successLabel = 'Critical Success';
  } else if (success === 1) {
    healFormula = `2d8${bonusString}`;
    successLabel = 'Success';
  } else if (success < 0) {
    healFormula = '1d8';
    successLabel = 'Critical Failure';
  }

  if (risky === true) {
    const harmRoll = new Roll('1d8').roll();
    ChatMessage.create(
      {
        user: game.user.id,
        type: CHAT_MESSAGE_TYPES.ROLL,
        flavor: `<strong>Damage Roll: Treat Wounds</strong> (Risky Surgery)`,
        roll: harmRoll,
        speaker: ChatMessage.getSpeaker(),
      },
      {}
    );
  }

  if (healFormula !== undefined) {
    const healRoll = new Roll(healFormula).roll();
    const rollType = success > 0 ? 'Healing' : 'Damage';
    ChatMessage.create(
      {
        user: game.user.id,
        type: CHAT_MESSAGE_TYPES.ROLL,
        flavor: `<strong>${rollType} Roll: Treat Wounds</strong> (${successLabel})`,
        roll: healRoll,
        speaker: ChatMessage.getSpeaker(),
      },
      {}
    );
  }
};

const applyChanges = ($html) => {
  const { name } = actor;
  const { med } = actor.data.data.skills;
  const { nat } = actor.data.data.skills;
  const dcmod = parseInt($html.find('[name="modifier"]').val()) || 0;
  const rollmod = parseInt($html.find('[name="rollmodifier"]').val()) || 0;
  const requestedProf = parseInt($html.find('[name="dc-type"]')[0].value) || 1;
  const nature = $html.find('[name="nature"]')[0].checked || false;
  const risky = $html.find('[name="risky"]')[0].checked || false;
  const skill = nature == true ? nat : med;
  const usedProf = requestedProf <= skill.rank ? requestedProf : skill.rank;
  const roll = [
    () =>
      ui.notifications.warn(
        `${name} is not trained in ${nature == true ? 'Nature' : 'Medicine'} and doesn't know how to treat wounds with it.`
      ),
    () => rollTreatWounds({ DC: 15 + dcmod, healBonus: 0, med: skill, rollmod, risky, nature }),
    () => rollTreatWounds({ DC: 20 + dcmod, healBonus: 10, med: skill, rollmod, risky, nature }),
    () => rollTreatWounds({ DC: 30 + dcmod, healBonus: 30, med: skill, rollmod, risky, nature }),
    () => rollTreatWounds({ DC: 40 + dcmod, healBonus: 50, med: skill, rollmod, risky, nature }),
  ][usedProf];
  roll();
};

if (token === undefined) {
  ui.notifications.warn('No token is selected.');
} else {
  const dialog = new Dialog({
    title: 'Better Treat Wounds',
    content: `
  <div>Select a target DC. Remember that you can't attempt a heal above your proficiency. Attempting to do so will downgrade the DC and amount healed to the highest you're capable of.</div>
  <hr/>
  <form>
  <div class="form-group">
  <label>Treat Wounds DC:</label>
  <select id="dc-type" name="dc-type">
  <option value="1">Trained DC 15</option>
  <option value="2">Expert DC 20, +10 Healing</option>
  <option value="3">Master DC 30, +30 Healing</option>
  <option value="4">Legendary DC 40, +50 Healing</option>
  </select>
  </div>
  <div class="form-group">
  <label>DC Modifier:</label>
  <input id="modifier" name="modifier" type="number"/>
  </div>
  <div class="form-group">
  <label>Roll Modifier:</label>
  <input id="rollmodifier" name="rollmodifier" type="number"/>
  </div>
  <div class="form-group" ${canNature == true ? '' : 'style="display: none;"'}>
  <label>Natural Medicine:</label>
  <input ${canNature == true ? 'checked' : ''} type="checkbox" name="nature">
  </div>
  <div class="form-group" ${canRisk == true ? '' : 'style="display: none;"'}>
  <label>Risky Surgery:</label>
  <input type="checkbox" name="risky">
  </div>
  </form>
  `,
    buttons: {
      yes: {
        icon: `<i class="fas fa-hand-holding-medical"></i>`,
        label: 'Treat Wounds',
        callback: applyChanges,
      },
      no: {
        icon: `<i class="fas fa-times"></i>`,
        label: 'Cancel',
      },
    },
    default: 'yes',
  });
  dialog.render(true);
}
