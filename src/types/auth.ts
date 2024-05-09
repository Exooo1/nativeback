export interface IAuth {
  name: string;
  surname: string;
  email: string;
  password: string;
  verify: string;
  id: number;
}

export type TSendEmail = {
  name: string;
  email: string;
  verify: string;
};

export type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
