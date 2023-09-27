const basicMessage = 'Make sure you are requesting';

export enum ExceptionMessages {
  limit = `${basicMessage} with a limit [greater] then [0].`,
  byId = `${basicMessage} with an Id of [greater] then [0].`,
  byName = `${basicMessage} a 1-9 [generation] pokemon [name].`,
}
