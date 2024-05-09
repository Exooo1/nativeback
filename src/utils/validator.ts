export const validatorMessages = {
  tString: 'The field should be a string',
  tNumber: 'The field should be a number',
  tBoolean: 'The field should be a boolean',
  emptyField: 'The field can not be empty',
};

export const returnValidatorMessage = (value: string, type: string) => {
  return value + ` ${validatorMessages[type]}`;
};

export enum validatorTypes {
  tString = 'tString',
  tNumber = 'tNumber',
  tBoolean = 'tBoolean',
  emptyField = 'emptyField',
}
