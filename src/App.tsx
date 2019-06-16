import * as React from "react";

import Dashboard from "./Dashboard";
import Store from "./Store";

const App: React.FC = (): JSX.Element => {
    return (
        <Store>
            <Dashboard />
        </Store>
    )
}

export default App;
