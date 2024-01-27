export interface LoginResponse {
  localId: string;

  idToken: string;
  expiresIn: number;

  refreshToken: string;
}
