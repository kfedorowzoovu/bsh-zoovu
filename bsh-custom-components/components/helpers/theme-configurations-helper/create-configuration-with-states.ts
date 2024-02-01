export type ConfigurationWithStates<
  States extends string = 'default',
  Configuration = unknown,
> = Record<States, Configuration>;

export const createConfigurationWithStates = <
  CustomConfigurationWithStates extends ConfigurationWithStates,
>(
  states: string[],
  ConfigurationConstructor: new () => unknown,
): { new (): CustomConfigurationWithStates } => {
  const classPlaceholder = class {} as new () => CustomConfigurationWithStates;
  states.forEach((state) => {
    classPlaceholder.prototype[state] = new ConfigurationConstructor();
  });
  return classPlaceholder;
};
