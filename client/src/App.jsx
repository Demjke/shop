// import axios from "axios";
// import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import AppRoutes from "./components/routes/AppRoutes";

const App = () => (
    <div className="app">
        <Header />
        <div className="main">
            <AppRoutes />
        </div>
    </div>
);

export default App;
