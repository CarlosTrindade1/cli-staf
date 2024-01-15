import { GluegunCommand } from 'gluegun';
import { scriptService } from '../core/script-service';

const command: GluegunCommand = {
  name: 'push',
  run: async (toolbox) => {
    const { print, parameters } = toolbox;

    if (!parameters.array) {
      return print.error('É necessário informar pelo menos 1 nome de arquivo.');
    }

    try {
      await scriptService.pushScript(parameters.array);
    } catch (error) {
      return print.error(error.message);
    }
  },
};

module.exports = command;
