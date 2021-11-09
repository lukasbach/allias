import { existsConfig, writeConfig } from '../data/config';
import prompts from 'prompts';
import { homedir } from 'os';
import * as path from 'path';
import { writeData } from '../data/data';

export const ensureConfig = async () => {
  if (!await existsConfig()) {
    const { dataFolder } = await prompts({
      type: 'text',
      name: 'dataFolder',
      message: 'Choose a folder where allias will store your commands as JSON file',
      initial: `${path.join(homedir(), '.allias')}`,
    });

    const { binFolder } = await prompts({
      type: 'text',
      name: 'binFolder',
      message: 'Choose a folder where allias will store the bin files',
      initial: `${path.join(dataFolder, 'bin')}`,
    });

    const { okay } = await prompts({
      type: 'confirm',
      name: 'okay',
      message: `Please make sure to add the folder "${binFolder}" to your system's path variables now.`,
      initial: true,
    });

    if (okay) {
      await writeConfig({
        dataFolder,
        binFolder,
      });
      await writeData({
        commands: [],
      });
    }

    return okay;
  }

  return true;
}