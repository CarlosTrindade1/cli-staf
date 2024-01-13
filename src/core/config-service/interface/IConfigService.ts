export interface IConfigService {
  saveToken: (token: string) => Promise<void>;
  saveUserAccess: (userAccess: string) => Promise<void>;
}
