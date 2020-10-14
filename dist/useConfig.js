import * as React from 'react';
export const ConfigContext = /*#__PURE__*/React.createContext();
export const ConfigProvider = ({
  config: initialConfig,
  children
}) => {
  const [config, setConfig] = React.useState(initialConfig);
  return /*#__PURE__*/React.createElement(ConfigContext.Provider, {
    value: {
      config,
      setConfig
    }
  }, children);
};
ConfigProvider.defaultProps = {
  config: {}
};
export const ConfigConsumer = ConfigContext.Consumer;
export const useConfig = () => {
  const context = React.useContext(ConfigContext);
  return [context.config, context.setConfig];
};
export default useConfig;