import { CommandData, Data } from '../types';
import * as fs from 'fs-extra';
import { getConfig } from './config';
import * as path from 'path';

const shebang = '#!/bin/sh\n';
let dataCache: Data;

const isCommandDataFile = async (filename: string) => {
  const { dataFolder } = await getConfig();
  return !(await fs.stat(path.join(dataFolder, filename))).isDirectory() && !filename.includes(".");
}

export const getData = async (): Promise<Data> => {
  const { dataFolder } = await getConfig();

  if (!dataCache) {
    dataCache = { commands: [] };
    for (const filename of (await fs.readdir(dataFolder))) {
      if (await isCommandDataFile(filename)) {
        dataCache.commands.push({
          commandName: filename,
          implementation: await fs.readFile(path.join(dataFolder, filename), { encoding: "utf8" }),
        })
      }
    }
  }
  return dataCache;
};

export const writeData = async (data: Data) => {
  const { dataFolder, binFolder } = await getConfig();
  await fs.ensureDir(dataFolder);
  await fs.ensureDir(binFolder);

  for (const filename of await fs.readdir(dataFolder)) {
    if (await isCommandDataFile(filename)) {
      await fs.remove(path.join(dataFolder, filename));
    }
  }

  for (const { implementation, commandName } of data.commands) {
    await fs.writeFile(path.join(dataFolder, commandName), implementation);
  }

  dataCache = data;
};

export const rewriteBinFolder = async () => {
  const { binFolder } = await getConfig();
  const { commands } = await getData();
  await fs.remove(binFolder);
  await fs.ensureDir(binFolder);

  for (const { commandName, implementation } of commands) {
    await fs.writeFile(path.join(binFolder, `${commandName}.cmd`), implementation);
    await fs.writeFile(path.join(binFolder, `${commandName}`), `${shebang}${implementation}`);
  }

  console.log("  Scripts updated. You may need to restart your terminal for changes to take effect.");
};

export const writeCommand = async (command: CommandData) => {
  const data = await getData();
  data.commands = data.commands.filter(oldCommand => oldCommand.commandName !== command.commandName);
  data.commands.push(command);
  await writeData(data);
  await rewriteBinFolder();
};

export const getCommands = async () => (await getData()).commands;

export const getCommand = async (commandName: string) => {
  return (await getCommands()).find(({ commandName }) => commandName === commandName)!;
};

export const existsCommand = async (commandName: string) => {
  return !!(await getCommand(commandName));
};

export const removeCommand = async (commandName: string) => {
  const data = await getData();
  data.commands = data.commands.filter(oldCommand => oldCommand.commandName !== commandName);
  await writeData(data);
  await rewriteBinFolder();
};