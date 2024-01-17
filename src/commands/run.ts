import { GluegunCommand } from 'gluegun';
import { scriptService } from '../core/script-service';
import { Spinner } from 'cli-spinner';

const command: GluegunCommand = {
  name: 'run',
  run: async (toolbox) => {
    const { print, parameters } = toolbox;

    const spinner = new Spinner('%s executando');
    spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');

    if (!parameters.first) {
      return print.error('Informe um arquivo para ser executado!');
    }

    const scriptName = parameters.first;

    try {
      spinner.start();

      const result = await scriptService.runScript(scriptName);

      spinner.stop(true);

      print.info(result);
    } catch (error) {
      spinner.stop(true);
      print.error(error.message);
    }
  },
};

module.exports = command;
