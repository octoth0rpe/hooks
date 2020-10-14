import * as React from 'react';

const SET_LANGUAGE_EVENT_TYPE = 'useTranslation-setLanguages';
const TranslationContext = React.createContext();

const translateKeys = (msgStr, keys) => {
  let output = msgStr;
  Object.keys(keys).forEach((key) => {
    output = output.replace(`{${key}}`, keys[key]);
  });
  return output;
};

export const setLanguages = languages => window.dispatchEvent(
  new CustomEvent(
    SET_LANGUAGE_EVENT_TYPE,
    { detail: languages },
  ),
);

export const TranslationProvider = ({
  children,
  translations,
  languages: defaultLanguages,
}) => {
  const [languages, setLanguages] = React.useState(defaultLanguages);
  React.useEffect(() => {
    const handler = ({ detail }) => setLanguages(detail);
    window.addEventListener(SET_LANGUAGE_EVENT_TYPE, handler);
    return () => window.removeEventListener(SET_LANGUAGE_EVENT_TYPE, handler);
  }, []);

  const translate = (msgId, keys = null) => {
    let msgStr = msgId;
    if (languages !== null) {
      languages.forEach((language) => {
        if (language in translations && msgId in translations[language]) {
          msgStr = translations[language][msgId];
        }
      });
    }
    return keys === null ? msgStr : translateKeys(msgStr, keys);
  };

  return (
    <TranslationContext.Provider value={translate}>
      {children}
    </TranslationContext.Provider>
  );
};

TranslationProvider.defaultProps = {
  languages: null,
};

export const useTranslation = () => React.useContext(TranslationContext);

export default useTranslation;