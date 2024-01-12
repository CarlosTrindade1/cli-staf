import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'config',
  run: async (toolbox) => {
    const { print, parameters } = toolbox;

    const subCommand = parameters.first;

    switch (subCommand) {
      case 'user.token':
        print.info(parameters);

        break;

      case 'user.access':
        print.info(parameters);
        break;

      default:
        print.info('Comando não encontrado');
        break;
    }
  },
};

module.exports = command;
