// args[0] = Target's token id
// args[1] = The damage type

const iconTarget = canvas.tokens.get(args[0]);

if (args[1] == 'bleed') {
  if (iconTarget.data.effects.includes('systems/pf2e/icons/spells/blood-vendetta.jpg') == false) {
    iconTarget.toggleEffect('systems/pf2e/icons/spells/blood-vendetta.jpg');
  }
} else if (args[1] == 'acid') {
  if (iconTarget.data.effects.includes('systems/pf2e/icons/spells/cloudkill.jpg') == false) {
    iconTarget.toggleEffect('systems/pf2e/icons/spells/cloudkill.jpg');
  }
} else if (args[1] == 'fire') {
  if (iconTarget.data.effects.includes('systems/pf2e/icons/spells/produce-flame.jpg') == false) {
    iconTarget.toggleEffect('systems/pf2e/icons/spells/produce-flame.jpg');
  }
}
