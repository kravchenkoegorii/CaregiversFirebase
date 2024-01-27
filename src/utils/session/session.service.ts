import { RefreshResponse, User } from "@module/types";

import { LOCAL_STORAGE_KEY_ACCESS_TOKEN, LOCAL_STORAGE_KEY_REFRESH_TOKEN } from "../../constants";
import { tokenAxiosInstance } from "../../middleware";
import { LocalStorageService } from "../local-storage";

interface AuthSession {
  userId?: string;

  accessToken: string;
  accessTokenExpiresAt: number;
  accessTokenTtl: number;

  refreshToken: string;
}

export class SessionService {
  static session: AuthSession;

  static sessionExpiresAt: number;

  static user: User;

  static userExpiresAt: number;

  static set(session: AuthSession): void {
    LocalStorageService.setWithExpiry(
      LOCAL_STORAGE_KEY_ACCESS_TOKEN,
      session.accessToken,
      session.accessTokenExpiresAt,
      session.accessTokenTtl
    );

    if (session.refreshToken) {
      LocalStorageService.set(
        LOCAL_STORAGE_KEY_REFRESH_TOKEN,
        session.refreshToken
      );
    }


  }

  static get(): AuthSession {
    if (this.session && this.sessionExpiresAt > Date.now()) {
      return this.session;
    }

    const {
      value: accessToken,
      expiresAt: accessTokenExpiresAt,
      ttl: accessTokenTtl
    } = LocalStorageService.getWithExpiry<string>(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

    const refreshToken = LocalStorageService.get(LOCAL_STORAGE_KEY_REFRESH_TOKEN);

    this.session = {
      accessToken,
      accessTokenTtl,
      accessTokenExpiresAt,
      refreshToken
    };

    this.sessionExpiresAt = accessTokenExpiresAt;

    return this.session;
  }

  static removeAccessToken(): void {
    LocalStorageService.remove(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    if (this.session) {
      this.session.accessToken = null;
      this.session.accessTokenExpiresAt = null;
      this.session.accessTokenTtl = null;
    }
  }

  static removeRefreshToken(): void {
    LocalStorageService.remove(LOCAL_STORAGE_KEY_REFRESH_TOKEN);
    if (this.session) {
      this.session.refreshToken = null;
    }
  }

  static clear(): void {
    this.removeAccessToken();
    this.removeRefreshToken();

    this.sessionExpiresAt = 0;
  }

  // static async getMe(): Promise<User> {
  //   if (this.user && this.userExpiresAt > Date.now()) {
  //     return this.user;
  //   }
  //
  //   const userResponse = await axiosInstance.get<User>("users/my");
  //
  //   this.user = userResponse.data;
  //   this.userExpiresAt = Date.now() + (CACHE_TTL_USER * 1000);
  //
  //   return this.user;
  // }
  //
  static async refresh(): Promise<void> {
    const session = SessionService.get();

    if (!session.refreshToken) {
      SessionService.clear();
      return Promise.reject();
    }

    if (session.accessToken && session.accessTokenExpiresAt > Date.now()) {
      return Promise.resolve();
    }

    const tokens = await tokenAxiosInstance.post<RefreshResponse>(process.env.REACT_APP_TOKEN_API_URL,
      {refresh_token: session.refreshToken, grant_type: "refresh_token"});

    const data = tokens.data;

    const authSession: AuthSession = {
      userId: data.user_id,
      accessToken: data.id_token,
      accessTokenExpiresAt: Date.now() + data.expires_in * 1000,
      accessTokenTtl: data.expires_in,
      refreshToken: data.refresh_token
    };

    SessionService.set(authSession);
    return Promise.resolve();
  }
}
