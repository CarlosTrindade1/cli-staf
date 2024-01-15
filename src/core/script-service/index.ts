import { ScriptService } from './ScriptService';
import { AxiosService } from './services/implementations/axios-service';
import { persistService } from '../persist-service';
import { FileService } from './services/implementations/file-service';

const axiosService = new AxiosService();
const fileService = new FileService();

const scriptService = new ScriptService(
  axiosService,
  persistService,
  fileService
);

export { scriptService };
