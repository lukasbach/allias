import { getCommand, getCommands } from '../data/data';
import prompts from 'prompts';
import { exec } from 'child_process';
import { mainMenu } from './main-menu';

export const chooseCommandToRun = async () => {
  const commands = await getCommands();

  if (commands.length === 0) {
    console.log("You don't have any commands yet. Go and create some!");
    await mainMenu();
    return;
  }

  const { choice } = await prompts({
    type: 'select',
    name: 'choice',
    message: `Which command do you want to run?`,
    choices: commands.map(({ commandName, implementation }) => ({
      title: commandName,
      description: implementation[0],
      value: commandName,
    }))
  });

  const { implementation } = await getCommand(choice);
  exec(implementation.join(' '));
};
