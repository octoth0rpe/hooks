import * as React from 'react';

export const ConfigContext = React.createContext();

export const ConfigProvider = ({ config: initialConfig, children }) => {
  const [config, setConfig] = React.useState(initialConfig);
  return (
    <ConfigContext.Provider
      value={{ config, setConfig }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

ConfigProvider.defaultProps = {
  config: {},
};

export const ConfigConsumer = ConfigContext.Consumer;
export const useConfig = () => {
  const context = React.useContext(ConfigContext);
  return [context.config, context.setConfig];
};

export default useConfig;