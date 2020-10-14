import * as React from 'react';
export const SessionConfigContext = /*#__PURE__*/React.createContext();
export const SessionConfigProvider = ({
  config: initialConfig,
  persistKey,
  children
}) => {
  const [config, setConfigInternal] = React.useState(JSON.parse(sessionStorage.getItem(persistKey)) || initialConfig);

  const setConfig = nextConfig => {
    sessionStorage.setItem(persistKey, JSON.stringify(nextConfig));
    setConfigInternal(nextConfig);
  };

  return /*#__PURE__*/React.createElement(SessionConfigContext.Provider, {
    value: {
      config,
      setConfig
    }
  }, children);
};
SessionConfigProvider.defaultProps = {
  config: {},
  persistKey: 'useSessionConfig'
};
export const SessionConfigConsumer = SessionConfigContext.Consumer;
export const useSessionConfig = () => {
  const context = React.useContext(SessionConfigContext);
  return [context.config, context.setConfig];
};
export default useSessionConfig;