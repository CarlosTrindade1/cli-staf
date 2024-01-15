import { GluegunCommand } from 'gluegun';
import { bgGreen, white } from 'picocolors';
import { prompt } from 'prompts';
import { scriptService } from '../core/script-service';

const command: GluegunCommand = {
  name: 'add',
  run: async (toolbox) => {
    const { print } = toolbox;

    const { scriptId } = await prompt({
      type: 'text',
      name: 'scriptId',
      message: 'Informe o ID do script',
      validate: (arg: string) => (!arg ? 'Informe um ID válido' : true),
    });

    const { scriptName } = await prompt({
      type: 'text',
      name: 'scriptName',
      message: 'Informe o nome do script',
      validate: (arg: string) => (!arg ? 'Informe um nome válido' : true),
    });

    try {
      await scriptService.addScript(scriptId, scriptName);

      print.success(
        `${bgGreen(`${white(' Script armazenado com sucesso! ')}`)}`
      );
    } catch (error) {
      print.error(error);
    }
  },
};

module.exports = command;
