import * as React from 'react';
export const LocalConfigContext = /*#__PURE__*/React.createContext();
export const LocalConfigProvider = ({
  config: initialConfig,
  persistKey,
  children
}) => {
  const [config, setConfigInternal] = React.useState(JSON.parse(localStorage.getItem(persistKey)) || initialConfig);

  const setConfig = nextConfig => {
    localStorage.setItem(persistKey, JSON.stringify(nextConfig));
    setConfigInternal(nextConfig);
  };

  return /*#__PURE__*/React.createElement(LocalConfigContext.Provider, {
    value: {
      config,
      setConfig
    }
  }, children);
};
LocalConfigProvider.defaultProps = {
  config: {},
  persistKey: 'useLocalConfig'
};
export const LocalConfigConsumer = LocalConfigContext.Consumer;
export const useLocalConfig = () => {
  const context = React.useContext(LocalConfigContext);
  return [context.config, context.setConfig];
};
export default useLocalConfig;