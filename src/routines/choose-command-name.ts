import prompts from 'prompts';

export const chooseCommandName = async () => {
  const { commandName } = await prompts({
    type: 'text',
    name: 'commandName',
    message: 'Choose the command name with which you will be able to invoke it later',
    validate: command => /^[a-zA-Z0-9-_]+$/.test(command) ? true : 'The command name may only contain characters, numbers and -_',
  });
  return commandName;
};
