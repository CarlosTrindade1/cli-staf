import { IConfigService } from './interface/IConfigService';

export class ConfigService implements IConfigService {
  public async saveToken(token: string): Promise<void> {
    //console.log('');
  }

  public async saveUserAccess(userAccess: string): Promise<void> {
    //console.log('');
  }
}
