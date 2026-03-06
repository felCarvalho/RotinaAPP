export type User = {
  identifier: string;
  username: string;
  sub: string;
  role: string;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
  expAccessToken: number;
};
