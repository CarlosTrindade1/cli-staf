import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'cli-staf',
  run: async (toolbox) => {
    const { print } = toolbox;

    print.info(toolbox.parameters);
  },
};

module.exports = command;
