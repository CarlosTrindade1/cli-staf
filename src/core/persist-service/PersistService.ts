import { IPersistService } from './interfaces/IPersistService';
const storage = require('node-persist');

export type ScriptsStorage = {
  id: string;
  name: string;
};

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
    await this.init();

    await storage.setItem('token', token);
  }

  public async getToken(): Promise<string> {
    await this.init();

    return await storage.getItem('token');
  }

  public async saveUserAccess(userAccess: string): Promise<void> {
    await this.init();

    await storage.setItem('userAccess', userAccess);
  }

  public async getUserAccess(): Promise<string> {
    await this.init();

    return await storage.getItem('userAccess');
  }

  public async setPath(path: string): Promise<void> {
    await this.init();

    await storage.setItem('path', path);
  }

  public async getPath(): Promise<string> {
    await this.init();

    return await storage.getItem('path');
  }

  public async addScript(idScript: string, scriptName: string): Promise<void> {
    await this.init();

    let scripts: ScriptsStorage[] = await storage.getItem('script');

    if (!scripts) scripts = [];

    const foundId = scripts.find((script) => script.id === idScript);

    const foundName = scripts.find((script) => script.name === scriptName);

    if (foundId || foundName) {
      throw Error('Um script com este id (ou nome) já foi cadastrado');
    }

    scripts.push({
      id: idScript,
      name: scriptName,
    });

    await storage.setItem('script', scripts);
  }

  public async getScript(
    scriptName: string
  ): Promise<ScriptsStorage | undefined> {
    await this.init();

    const scripts: ScriptsStorage[] = await storage.getItem('script');

    const script = scripts.find((script) => script.name === scriptName);

    return script;
  }
}
