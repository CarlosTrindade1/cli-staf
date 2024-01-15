import { IPersistService } from './interfaces/IPersistService';
const storage = require('node-persist');

export class PersistService implements IPersistService {
  public async init(): Promise<void> {
    await storage.init({
      dir: `${__dirname}/storage`,
      stringify: JSON.stringify,
      parse: JSON.parse,
      encoding: 'utf-8',
      logging: false,
      ttl: false,
      expiredInterval: 2 * 60 * 1000,
      forgiveParseErrors: false,
      writeQueue: true,
      writeQueueIntervalMs: 1000,
      writeQueueWriteOnlyLast: true,
    });
  }

  public async saveToken(token: string): Promise<void> {
    await storage.setItem('token', token);
  }

  public async getToken(): Promise<string> {
    return await storage.getItem('token');
  }

  public async saveUserAccess(userAccess: string): Promise<void> {
    // ...
  }
}
