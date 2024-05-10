export const validatorMessages = {
  simpleType: 'the field should be a',
  empty: 'the field cannot be',
};

export const returnValidatorMessage = (value: string, type: string) => {
  let text = '';
  switch (type) {
    case 'empty':
      text = validatorMessages[type];
      break;
    default:
      text = validatorMessages['simpleType'];
  }
  return value[0].toUpperCase() + value.slice(1) + ` - ${text} ${type}`;
};

export enum validatorTypes {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  isArray = 'isArray',
  empty = 'empty',
}
