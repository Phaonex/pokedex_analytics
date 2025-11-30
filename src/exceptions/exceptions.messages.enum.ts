const basicMessage = 'Make sure you are requesting';

export enum ExceptionMessages {
  limit = `${basicMessage} with a limit [greater] then [0].`,
  byId = `${basicMessage} with an Id of [greater] then [0].`,
  byName = `${basicMessage} a 1-9 [generation] pokemon [name].`,
  byType1 = `${basicMessage} a 1-9 [generation] pokemon Type1 [Type1].`,
  byType2= `${basicMessage} a 1-9 [generation] pokemon Type1 and Type2 [Type1], [Type2].`,
}
