import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />

            <Route

                path="/dashboard"

                element={

                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>

                }

            />

            <Route

                path="/tickets"

                element={

                    <ProtectedRoute>

                        <Tickets />

                    </ProtectedRoute>

                }

            />

            <Route

                path="*"

                element={<NotFound />}

            />

        </Routes>

    );

}

export default App;