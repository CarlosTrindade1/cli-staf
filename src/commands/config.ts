import { GluegunCommand } from 'gluegun';
import { bgGreen, bgRed, white } from 'picocolors';
import { configService } from '../core/config-service';
import { prompt } from 'prompts';

const command: GluegunCommand = {
  name: 'config',
  run: async (toolbox) => {
    const { print } = toolbox;

    const { token } = await prompt({
      type: 'text',
      name: 'token',
      message: 'Informe o auth token',
      validate: (arg: string) => (!arg ? 'Informe um token válido' : true),
    });

    const { userAccess } = await prompt({
      type: 'text',
      name: 'userAccess',
      message: 'Informe o user-access',
      validate: (arg: string) =>
        !arg ? 'Informe um user access válido' : true,
    });

    try {
      await configService.saveToken(token);
      await configService.saveUserAccess(userAccess);

      return print.success(
        `${bgGreen(`${white(' Configurações armazenadas com sucesso! ')}`)}`
      );
    } catch (error) {
      console.log(error);
      return print.error(
        `${bgRed(`${white(' Ocorreu um erro inesperado. ')}`)}`
      );
    }
  },
};

module.exports = command;
