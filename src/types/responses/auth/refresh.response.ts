export interface RefreshResponse {
  user_id: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
}