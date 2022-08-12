import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

const App = () => {
    return (
        <Routes>
            {routes.map((i) => (
                <Route key={i.path} path={i.path} element={i.element} />
            ))}
        </Routes>
    );
};

export default App;
