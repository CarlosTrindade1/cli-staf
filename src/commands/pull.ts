import { GluegunCommand } from 'gluegun';
import { scriptService } from '../core/script-service';

const command: GluegunCommand = {
  name: 'pull',
  run: async (toolbox) => {
    const { print, parameters } = toolbox;

    const scriptName = parameters.first;

    if (!scriptName) {
      return print.error('Nome de script inálido');
    }

    try {
      await scriptService.getScript(scriptName);
    } catch (error) {
      return print.error(error);
    }
  },
};

module.exports = command;
