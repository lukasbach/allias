import prompts from 'prompts';
import { mainMenu } from './main-menu';
import { deleteConfig } from '../data/config';

export const deleteData = async () => {
  const { okay } = await prompts({
    type: 'confirm',
    name: 'okay',
    message: `Are you sure you want to delete all local data? This will irreversibly remove all your aliases and allias configuration data.`,
    initial: true,
  });

  if (okay) {
    await deleteConfig();
  } else {
    await mainMenu();
  }
};
