import * as React from 'react';
const importData = require('../data/data.json');

type AppStateProps = {
  data: any
};

const defaultProps: AppStateProps = {
  data: importData,
};

const appStateContext = React.createContext<AppStateProps>(defaultProps);

type ProviderProps = Record<string, unknown>;

export const useAppState = (): AppStateProps => {
  return React.useContext(appStateContext);
};

export const ProvideAppState: React.FunctionComponent<ProviderProps> = ({ children }) => {
  const values = useProvideAppState();
  return <appStateContext.Provider value={values}>{children}</appStateContext.Provider>;
};

function useProvideAppState(): AppStateProps {
  const [data, setData] = React.useState(defaultProps.data);

  return {
    data,
  };
}
