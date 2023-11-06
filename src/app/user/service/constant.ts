const url = 'http://localhost:8080/api';
const LOGIN_ENDPOINT = 'login';
const REGISTER_ENDPOINT = 'register';
const USER_INFO_ENDPOINT = 'info';
const REFRESH_TOKEN_ENDPOINT = 'refreshToken';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const PROVOKE_ENDPOINT = 'provoke';

interface HttpResponse {
  timeStamp: string;
  statusCode: number;
  data: Object;
}

interface JwtToken {
  accessToken: string;
  refreshToken: string;
}

export {
  url,
  HttpResponse,
  JwtToken,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  USER_INFO_ENDPOINT,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REFRESH_TOKEN_ENDPOINT,
  PROVOKE_ENDPOINT,
};
