import { writeCommand } from '../data/data';
import { chooseCommandName } from './choose-command-name';
import { chooseCommandImplementation } from './choose-command-implementation';
import { mainMenu } from './main-menu';

export const newCommand = async () => {
  const commandName = await chooseCommandName();
  const implementation = await chooseCommandImplementation();

  await writeCommand({ commandName, implementation });
  await mainMenu();
};
