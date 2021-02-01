// args[0] = Target's token id
// args[1] = The damage type
// args[2] = desired state

const iconTarget = canvas.tokens.get(args[0]);

if (args[1] == 'bleed') {
  iconTarget.toggleEffect('systems/pf2e/icons/spells/blood-vendetta.jpg');
} 
if (args[1] == 'acid') {
  iconTarget.toggleEffect('systems/pf2e/icons/spells/cloudkill.jpg');
} 
if (args[1] == 'fire') {
  iconTarget.toggleEffect('systems/pf2e/icons/spells/produce-flame.jpg');
} 
if (args[1] == 'fast-healing') {
  iconTarget.toggleEffect('systems/pf2e/icons/spells/life-boost.jpg');
} 
if (args[1] == 'regen') {
  iconTarget.toggleEffect('systems/pf2e/icons/spells/regeneration.jpg');
}
