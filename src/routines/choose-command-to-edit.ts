import { getCommands } from '../data/data';
import prompts from 'prompts';
import { editCommand } from './edit-command';
import { mainMenu } from './main-menu';

const back = "%%%back";

export const chooseCommandToEdit = async () => {
  const commands = await getCommands();

  if (commands.length === 0) {
    console.log("You don't have any commands yet. Go and create some!");
    await mainMenu();
    return;
  }

  const { choice } = await prompts({
    type: 'select',
    name: 'choice',
    message: `Which command do you want to edit?`,
    choices: [
      ...commands.map(({ commandName, implementation }) => ({
        title: commandName,
        description: implementation[0],
        value: commandName,
      })),
      {
        title: "Back",
        value: back
      }
    ]
  });

  if (choice === back) {
    await mainMenu();
    return;
  }

  await editCommand(choice);
};
