export interface IApiService {
  getScript(
    idScript: string,
    credentials: {
      token: string;
      userAccess: string;
    }
  ): Promise<any>;
  putScript(
    idScript: string,
    fileContent: string,
    credentials: { token: string; userAccess: string }
  ): Promise<void>;
  runScript(
    idScript: string,
    credentials: {
      token: string;
      userAccess: string;
    }
  ): Promise<string>;
}
