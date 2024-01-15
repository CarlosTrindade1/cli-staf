import { PersistService } from './PersistService';

const persistService = new PersistService();

(async () => {
  await persistService.init();

  await persistService.saveToken('teste');

  console.log(await persistService.getToken());
})();
