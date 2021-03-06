import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import SuspenseFallback from "./components/suspense-fallback/suspense-fallback";
import UserContextProvider from "./contexts/user-context/user-context-provider";
import "./translations/translations";

const App = lazy(() => import('./layout/app/app'));

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<SuspenseFallback />}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
