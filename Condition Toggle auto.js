(async () => {
  let target;
  let condition;
  if (args[0] != undefined) {
    target = canvas.tokens.get(args[0]);
    condition = args[1]
  } else {
    target = token;
    condition = 'Flat-Footed'
  }

  let conditionType = PF2eConditionManager.getCondition(condition);
  let conditionValue = target.actor.data.items.find((x) => x.name === conditionType.name) ? 0 : 1;
  if (conditionValue == 1) {
    await PF2eConditionManager.addConditionToToken(conditionType, target);
    updateHUD();
  } else {
    await PF2eConditionManager.updateConditionValue(
      target.actor.data.items.find((x) => x.name === conditionType.name)._id,
      target,
      conditionValue
    );
  }
  function updateHUD() {
    const conditions = token.actor.items.filter((c) => c.type === 'condition');
    let updates = [];
    let x;
    for (x = 0; x < conditions.length; x++) {
      updates.push({ "_id": conditions[x]._id, 'data.sources.hud': true });
    }
    console.log(updates)
    token.actor.updateEmbeddedEntity('OwnedItem', updates);
  }
})();
