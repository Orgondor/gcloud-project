import * as React from "react";

type AppStateProps = Record<string, unknown>;

const defaultProps: AppStateProps = {};

const appStateContext = React.createContext<AppStateProps>(defaultProps);

type ProviderProps = Record<string, unknown>;

export const useAppState = (): AppStateProps => {
  return React.useContext(appStateContext);
};

export const ProvideAppState: React.FunctionComponent<ProviderProps> = ({
  children,
}) => {
  const values = useProvideAppState();
  return (
    <appStateContext.Provider value={values}>
      {children}
    </appStateContext.Provider>
  );
};

function useProvideAppState(): AppStateProps {
  return {};
}
