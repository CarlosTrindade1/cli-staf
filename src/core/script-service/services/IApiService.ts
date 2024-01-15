export interface IApiService {
  getScript(
    idScript: string,
    credentials: {
      token: string;
      userAccess: string;
    }
  ): Promise<any>;
}
