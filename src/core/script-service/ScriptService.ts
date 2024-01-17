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

  private async watchExecution(executionCode: string): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      const interval = setInterval(
        async (executionCode: string) => {
          if (
            await this.apiService.consultExecution(executionCode, {
              token: await this.persistService.getToken(),
              userAccess: await this.persistService.getUserAccess(),
            })
          ) {
            clearInterval(interval);
            resolve(true);
          }
        },
        5000,
        executionCode
      );
    });
  }

  private async getLogExecution(executionCode: string): Promise<string> {
    const response = await this.apiService.getLogStream(executionCode, {
      token: await this.persistService.getToken(),
      userAccess: await this.persistService.getUserAccess(),
    });

    let content = '';

    for (const event of response.events) {
      content += event.message + '\n';
    }

    return content;
  }

  public async runScript(scriptName: string): Promise<string> {
    const script = await this.persistService.getScript(scriptName);

    if (!script) {
      throw Error('Não foi encontrado um script com este nome.');
    }

    const executionCode = await this.apiService.runScript(script.id, {
      token: await this.persistService.getToken(),
      userAccess: await this.persistService.getUserAccess(),
    });

    const completed = await this.watchExecution(executionCode);

    if (completed) {
      return await this.getLogExecution(executionCode);
    }

    return '';
  }
}
