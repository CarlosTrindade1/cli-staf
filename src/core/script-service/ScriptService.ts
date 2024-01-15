import {
  PersistService,
  ScriptsStorage,
} from '../persist-service/PersistService';
import { IApiService } from './services/IApiService';
import { IFileService } from './services/IFileService';

export class ScriptService {
  constructor(
    private readonly apiService: IApiService,
    private readonly persistService: PersistService,
    private readonly fileService: IFileService
  ) {}

  public async getScript(scriptName: string): Promise<void> {
    const script = await this.persistService.getScript(scriptName);

    if (!script) {
      throw Error('Não foi encontrado um script com esse nome');
    }

    const response = await this.apiService.getScript(script.id, {
      token: await this.persistService.getToken(),
      userAccess: await this.persistService.getUserAccess(),
    });

    await this.fileService.writeNewFile(
      response?.data?.codigoFonte,
      await this.persistService.getPath(),
      script.name
    );
  }

  public async addScript(scriptId: string, scriptName: string): Promise<void> {
    if (!scriptId) {
      throw Error('ID inválido');
    }

    if (!scriptName) {
      throw Error('Nome inválido');
    }

    await this.persistService.addScript(scriptId, scriptName);
  }

  public async pushScript(scriptNames: string[]): Promise<void> {
    const scripts: ScriptsStorage[] = [];

    if (scriptNames) {
      for (const name of scriptNames) {
        scripts.push(await this.persistService.getScript(name));
      }
    } else {
      scripts.push(...(await this.persistService.getAllScripts()));
    }

    if (!scripts) {
      throw Error('Não há scripts a serem enviados.');
    }

    scripts.forEach(async (script) => {
      const path = await this.persistService.getPath();
      const fileName = script.name;

      const fileContent = await this.fileService.readFile(
        `${path}${fileName}.groovy`
      );

      await this.apiService.putScript(script.id, fileContent, {
        token: await this.persistService.getToken(),
        userAccess: await this.persistService.getUserAccess(),
      });
    });
  }
}
