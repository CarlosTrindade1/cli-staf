export interface IFileService {
  writeNewFile(file: string, path: string, fileName: string): Promise<void>;
  readFile(path: string): Promise<string>;
}
