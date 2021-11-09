import * as path from 'path';
import { homedir } from 'os';
import * as fs from 'fs-extra';
import { Config } from '../types';

const configFile = path.join(homedir(), '.alliasrc.json');
let configCache: Config;

export const getConfig = async (): Promise<Config> => {
  if (!configCache) {
    if (!await existsConfig()) {
      throw Error("getConfig called when there was no config file");
    }

    configCache = await fs.readJSON(configFile);
  }
  return configCache;
};

export const existsConfig = async () => {
  return !!configCache || fs.existsSync(configFile);
};

export const writeConfig = async (config: Config) => {
  await fs.writeJson(
    configFile,
    config,
    {
      spaces: 2,
    }
  );
  configCache = config;
};

export const deleteConfig = async () => {
  const { dataFolder, binFolder } = await getConfig();
  await fs.remove(binFolder);
  await fs.remove(dataFolder);
  await fs.remove(configFile);
}