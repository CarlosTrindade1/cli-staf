import { ConfigService } from './ConfigService';
import { persistService } from '../persist-service';

const configService = new ConfigService(persistService);

export { configService };
