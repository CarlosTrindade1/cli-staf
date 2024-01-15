export interface IPersistService {
  saveToken(token: string): Promise<void>;
  getToken(): Promise<string>;
  saveUserAccess(userAccess: string): Promise<void>;
}
