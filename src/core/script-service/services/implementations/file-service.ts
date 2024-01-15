import { IFileService } from '../IFileService';
import { promises } from 'fs';

export class FileService implements IFileService {
  public async writeNewFile(
    file: string,
    path: string,
    fileName: string
  ): Promise<void> {
    await promises.writeFile(`${path}${fileName}.groovy`, file);
  }

  public async readFile(path: string): Promise<string> {
    const fileContent = await promises.readFile(`${path}`, {
      encoding: 'utf-8',
    });

    await this.writeNewFile(fileContent, './', 'teste.groovy');

    return fileContent;
  }
}