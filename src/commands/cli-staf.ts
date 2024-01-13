import { GluegunCommand } from 'gluegun';
import { bgBlue, white } from 'picocolors';

const command: GluegunCommand = {
  name: 'cli-staf',
  run: async (toolbox) => {
    const { print } = toolbox;

    print.info(`${bgBlue(`${white(' Welcome to cli-staf ')}`)}`);
  },
};

module.exports = command;
