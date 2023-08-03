import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import { routes } from "./constants/routes";

function App() {
    const element = useRoutes(routes);
    return <>{element}</>;
}

export default App;
