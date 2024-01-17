import { GluegunCommand } from 'gluegun';
import { scriptService } from '../core/script-service';

const command: GluegunCommand = {
  name: 'run',
  run: async (toolbox) => {
    const { print, parameters } = toolbox;

    if (!parameters.first) {
      return print.error('Informe um arquivo para ser executado!');
    }

    const scriptName = parameters.first;

    try {
      const result = await scriptService.runScript(scriptName);

      print.info(result);
    } catch (error) {
      print.error(error);
    }
  },
};

module.exports = command;
