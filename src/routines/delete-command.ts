import prompts from 'prompts';
import { removeCommand } from '../data/data';
import { mainMenu } from './main-menu';
import { editCommand } from './edit-command';

export const deleteCommand = async (commandName: string) => {
  const { okay } = await prompts({
    type: 'confirm',
    name: 'okay',
    message: `Are you sure you want to delete the command ${commandName}?`,
    initial: true,
  });

  if (okay) {
    await removeCommand(commandName);
    await mainMenu();
  } else {
    await editCommand(commandName);
  }
};
