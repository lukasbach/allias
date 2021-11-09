import prompts from 'prompts';
import { newCommand } from './new-command';
import { chooseCommandToEdit } from './choose-command-to-edit';
import { chooseCommandToRun } from './choose-command-to-run';
import { deleteData } from './delete-data';

export const mainMenu = async () => {
  const { choice } = await prompts({
    type: 'select',
    name: 'choice',
    message: 'What do you want to do?',
    choices: [
      {
        title: "New Command",
        value: "new",
      },
      {
        title: "Edit Command",
        value: "edit",
      },
      {
        title: "Delete all data",
        value: "delete",
      },
      {
        title: "Exit",
        value: "exit",
      },
    ]
  });

  switch (choice) {
    case "new": {
      await newCommand();
      break;
    }
    case "edit": {
      await chooseCommandToEdit();
      break;
    }
    case "run": {
      await chooseCommandToRun();
      break;
    }
    case "delete": {
      await deleteData();
      break;
    }
    case "exit": {
      return;
    }
  }
};