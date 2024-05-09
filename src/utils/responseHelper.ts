import { FindOptions } from 'sequelize';

export type TResponse<T> = {
  message: string;
  payload: T;
};

export const responseHelper = <T>(message: string, payload?: T): TResponse<T> => {
  return {
    message,
    payload,
  };
};

export const whereOptions = <T>(where: T, raw = false): FindOptions => {
  return {
    raw,
    where,
  } as FindOptions;
};
