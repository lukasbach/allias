import prompts from 'prompts';
import { getCommand, removeCommand, writeCommand } from '../data/data';
import { chooseCommandImplementation } from './choose-command-implementation';
import { chooseCommandName } from './choose-command-name';
import { mainMenu } from './main-menu';
import { deleteCommand } from './delete-command';

export const editCommand = async (commandName: string) => {
  const { implementation } = await getCommand(commandName);
  const { choice } = await prompts({
    type: 'select',
    name: 'choice',
    message: `What do you change for the command ${commandName}?`,
    choices: [
      {
        title: "Change implementation",
        description: implementation[0],
        value: "implementation",
      },
      {
        title: "Change command name",
        description: commandName,
        value: "commandName",
      },
      {
        title: "Delete command",
        description: commandName,
        value: "delete",
      },
      {
        title: "Go back",
        value: "back",
      },
    ]
  });

  switch (choice) {
    case "implementation": {
      const { implementation: initial } = await getCommand(commandName);
      const implementation = await chooseCommandImplementation(initial.join(" "));
      await writeCommand({ commandName, implementation });
      await editCommand(commandName);
      break;
    }
    case "commandName": {
      const newCommandName = await chooseCommandName();
      await removeCommand(commandName);
      await writeCommand({ commandName: newCommandName, implementation });
      await editCommand(commandName);
      break;
    }
    case "delete": {
      await deleteCommand(commandName);
      break;
    }
    case "back": {
      await mainMenu();
    }
  }
};
