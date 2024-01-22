import { IApiService } from '../IApiService';
import axios from 'axios';

export class AxiosService implements IApiService {
  private readonly api = axios;
  private readonly scriptBaseUrl =
    'https://plataforma-scripts.betha.cloud/scripts/v1/api/scripts';
  private readonly draftBaseUrl =
    'https://plataforma-scripts.betha.cloud/scripts/v1/api/rascunhos';

  private readonly consultBaseUrl =
    'https://plataforma-execucoes.betha.cloud/v1/consulta/api/protocolo';

  private readonly logStreamBaseUrl =
    'https://plataforma-execucoes.betha.cloud/v1/api/execucoes';

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

    if (response.data.error) {
      let message = '';

      for (const error of response.data.errors) {
        message += `${error.message} (${error.lineNumber}:${error.columnNumber})\n`;
      }

      throw Error(message);
    }

    return response.data.codigoExecucao;
  }

  public async consultExecution(
    executionCode: string,
    credentials: {
      token: string;
      userAccess: string;
    }
  ): Promise<boolean> {
    const { data } = await this.api.get(
      `${this.consultBaseUrl}/${executionCode}`,
      {
        headers: {
          authorization: credentials.token,
          'user-access': credentials.userAccess,
        },
      }
    );

    return data.concluida;
  }

  public async getLogStream(
    executionCode: string,
    credentials: {
      token: string;
      userAccess: string;
    }
  ): Promise<any> {
    let nextToken = '';
    const events = [];

    do {
      let url = `${this.logStreamBaseUrl}/${executionCode}/log-stream`;

      if (nextToken) {
        url += `?nextToken=f%2F${nextToken}%2Fs`;
      }

      const { data } = await this.api.get(url, {
        headers: {
          authorization: credentials.token,
          'user-access': credentials.userAccess,
        },
      });

      nextToken = data.nextForwardToken;
      console.log(nextToken);
      events.push(...data.events);

      if (nextToken) nextToken = nextToken.substring(2, 58);
    } while (nextToken);

    return events;
  }
}
