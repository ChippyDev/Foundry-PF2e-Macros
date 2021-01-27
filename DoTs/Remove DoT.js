if (token.data.effects.includes('systems/pf2e/icons/spells/blood-vendetta.jpg') == true) {
  token.toggleEffect('systems/pf2e/icons/spells/blood-vendetta.jpg');
  const alertId = TurnAlert.getAlertByName(`${target.data._id}:bleed`).id
  TurnAlert.delete(game.combat._id, alertId)
} else if (token.data.effects.includes('systems/pf2e/icons/spells/cloudkill.jpg') == true) {
  token.toggleEffect('systems/pf2e/icons/spells/cloudkill.jpg');
  const alertId = TurnAlert.getAlertByName(`${target.data._id}:acid`).id
  TurnAlert.delete(game.combat._id, alertId)
} else if (token.data.effects.includes('systems/pf2e/icons/spells/produce-flame.jpg') == true) {
  token.toggleEffect('systems/pf2e/icons/spells/produce-flame.jpg');
  const alertId = TurnAlert.getAlertByName(`${target.data._id}:fire`).id
  TurnAlert.delete(game.combat._id, alertId)
} else if (token.data.effects.includes('icons/Conditions/Fated.png') == true) {
  token.toggleEffect('icons/Conditions/Fated.png');
  const alertId = TurnAlert.getAlertByName(`${target.data._id}:healing`).id
  TurnAlert.delete(game.combat._id, alertId)
}