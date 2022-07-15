import * as React from "react";
import { ProvideAppState } from "./hooks/useAppState";
import Router from "./router";

export default function App(): JSX.Element {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ProvideAppState>
        <Router />
      </ProvideAppState>
    </div>
  );
}
