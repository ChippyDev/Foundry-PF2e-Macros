(async () => {
  // set condition
  let conditionType = PF2eConditionManager.getCondition('Flat-Footed');
  // if it exists already set to 0 else 1
  let conditionValue = token.actor.data.items.find((x) => x.name === conditionType.name) ? 0 : 1;
  // if 1 applys condition else removes condition by setting its value to 0
  if (conditionValue == 1) {
    await PF2eConditionManager.addConditionToToken(conditionType, token);
    updateHUD();
  } else {
    await PF2eConditionManager.updateConditionValue(
      token.actor.data.items.find((x) => x.name === conditionType.name)._id,
      token,
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
