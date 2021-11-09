export interface CommandData {
  commandName: string;
  implementation: string[];
}

export interface Config {
  binFolder: string;
  dataFolder: string;
}

export interface Data {
  commands: CommandData[];
}
