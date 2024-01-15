import { IApiService } from '../IApiService';
import axios from 'axios';

export class AxiosService implements IApiService {
  private readonly api = axios;
  private readonly scriptBaseUrl =
    'https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts';
  /*private readonly draftBaseUrl =
    'https://plataforma-scripts.betha.cloud/scripts/v1/api/rascunhos';*/

  public async getScript(
    idScript: string,
    credentials: { token: string; userAccess: string }
  ): Promise<any> {
    const response = await this.api.post(
      `${this.scriptBaseUrl}/${idScript}/acoes/rascunho`,
      {},
      {
        headers: {
          Authority: 'plataforma-scripts.betha.cloud',
          'user-access': credentials.userAccess,
          'Content-Type': 'application/json;charset=UTF-8',
          authorization: credentials.token,
        },
      }
    );

    return response;
  }
}
