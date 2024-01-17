import { IApiService } from '../IApiService';
import axios from 'axios';

export class AxiosService implements IApiService {
  private readonly api = axios;
  private readonly scriptBaseUrl =
    'https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts';
  private readonly draftBaseUrl =
    'https://plataforma-scripts.betha.cloud/scripts/v1/api/rascunhos';

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

  public async putScript(
    idScript: string,
    fileContent: string,
    credentials: { token: string; userAccess: string }
  ): Promise<void> {
    const { data } = await this.getScript(idScript, credentials);

    const draftId = data.id;

    await axios.put(`${this.draftBaseUrl}/${draftId}/fonte`, fileContent, {
      headers: {
        Authority: 'plataforma-scripts.betha.cloud',
        'user-access': credentials.userAccess,
        'Content-Type': 'application/json;charset=UTF-8',
        authorization: credentials.token,
      },
      transformRequest: (data, _) => {
        return data;
      },
    });
  }

  public async runScript(
    idScript: string,
    credentials: {
      token: string;
      userAccess: string;
    }
  ): Promise<string> {
    const { data } = await this.getScript(idScript, credentials);

    const draftId = data.id;

    const form = new FormData();

    const response = await this.api({
      url: `${this.draftBaseUrl}/${draftId}/acoes/executar`,
      method: 'POST',
      headers: {
        authorization: credentials.token,
        'Content-Type': 'multipart/form-data',
        'user-access': credentials.userAccess,
      },
      data: form,
    });

    console.log(response.data);

    return '';
  }
}
