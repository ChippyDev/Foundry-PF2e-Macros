// args[0] = Target's token id
// args[1] = The damage type
// args[2] = desired state

const iconTarget = canvas.tokens.get(args[0]);
let typeURL;

function Toggleicon(type) {
  const status = iconTarget.data.effects.includes(type);
  if (status == args[2]) {
    return;
  }
  iconTarget.toggleEffect(type);
}

switch (args[1]) {
  case 'bleed':
    typeURL = 'systems/pf2e/icons/spells/blood-vendetta.jpg';
    break;
  case 'acid':
    typeURL = 'systems/pf2e/icons/spells/cloudkill.jpg';
    break;
  case 'fire':
    typeURL = 'systems/pf2e/icons/spells/produce-flame.jpg';
    break;
  case 'fast-healing':
    typeURL = 'systems/pf2e/icons/spells/life-boost.jpg';
    break;
  case 'regen':
    typeURL = 'systems/pf2e/icons/spells/regeneration.jpg';
    break;
  default:
    ui.notifications.warn('Invalid effect type');
    return;
}
Toggleicon(typeURL);
