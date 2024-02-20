import { GluegunCommand } from 'gluegun';
import { configService } from '../core/config-service';
import { bgGreen, bgRed, white } from 'picocolors';
import { prompt } from 'prompts';

const command: GluegunCommand = {
  name: 'token',
  run: async (toolbox) => {
    const { print } = toolbox;

    const { token } = await prompt({
      type: 'text',
      name: 'token',
      message: 'Informe o auth token',
      validate: (arg: string) => (!arg ? 'Informe um token válido' : true),
    });

    try {
      await configService.saveToken(token);

      return print.success(
        `${bgGreen(`${white(' Token armazenado com sucesso! ')}`)}`
      );
    } catch (error) {
      `${bgRed(`${white(' Ocorreu um erro inesperado. ')}`)}`;
    }
  },
};

module.exports = command;
