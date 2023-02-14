import React from "react";
import Loading from "./components/Loading";
import Maps from "./components/Maps";
import { useStateContext } from "./context/ContextProvider";

function App() {
  const { isLoaded, show } = useStateContext();

  return isLoaded && show ? <Maps /> : <Loading />;
}

export default App;
