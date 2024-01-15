import { ScriptsStorage } from '../PersistService';

export interface IPersistService {
  saveToken(token: string): Promise<void>;
  getToken(): Promise<string>;
  saveUserAccess(userAccess: string): Promise<void>;
  getUserAccess(): Promise<string>;
  setPath(path: string): Promise<void>;
  getPath(): Promise<string>;
  addScript(idScript: string, scriptName: string): Promise<void>;
  getScript(scriptName: string): Promise<ScriptsStorage | undefined>;
}
