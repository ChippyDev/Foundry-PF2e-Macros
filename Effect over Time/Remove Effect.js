if (token.data.effects.includes('systems/pf2e/icons/spells/blood-vendetta.jpg') == true) {
  token.toggleEffect('systems/pf2e/icons/spells/blood-vendetta.jpg');
  const alertId = TurnAlert.getAlertByName(`${token.data._id}:bleed`).id;
  TurnAlert.delete(game.combat._id, alertId);
} else if (token.data.effects.includes('systems/pf2e/icons/spells/cloudkill.jpg') == true) {
  token.toggleEffect('systems/pf2e/icons/spells/cloudkill.jpg');
  const alertId = TurnAlert.getAlertByName(`${token.data._id}:acid`).id;
  TurnAlert.delete(game.combat._id, alertId);
} else if (token.data.effects.includes('systems/pf2e/icons/spells/produce-flame.jpg') == true) {
  token.toggleEffect('systems/pf2e/icons/spells/produce-flame.jpg');
  const alertId = TurnAlert.getAlertByName(`${token.data._id}:fire`).id;
  TurnAlert.delete(game.combat._id, alertId);
} else if (token.data.effects.includes('systems/pf2e/icons/spells/life-boost.jpg') == true) {
  token.toggleEffect('systems/pf2e/icons/spells/life-boost.jpg');
  const alertId = TurnAlert.getAlertByName(`${token.data._id}:fast-healing`).id;
  TurnAlert.delete(game.combat._id, alertId);
} else if (token.data.effects.includes('systems/pf2e/icons/spells/regeneration.jpg') == true) {
  token.toggleEffect('systems/pf2e/icons/spells/regeneration.jpg');
  const alertId = TurnAlert.getAlertByName(`${token.data._id}:regen`).id;
  TurnAlert.delete(game.combat._id, alertId);
}
