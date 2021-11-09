import prompts from 'prompts';

export const chooseCommandImplementation = async (initial?: string) => {
  const { implementation } = await prompts({
    type: 'text',
    name: 'implementation',
    message: 'Specify the implementation for your commandName',
    initial,
  });
  return [implementation];
};
