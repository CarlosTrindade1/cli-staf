import { IPersistService } from '../persist-service/interfaces/IPersistService';
import { IConfigService } from './interface/IConfigService';

export class ConfigService implements IConfigService {
  constructor(private readonly persistService: IPersistService) {}

  public async saveToken(token: string): Promise<void> {
    await this.persistService.saveToken(token);
  }

  public async saveUserAccess(userAccess: string): Promise<void> {
    await this.persistService.saveUserAccess(userAccess);
  }
}
