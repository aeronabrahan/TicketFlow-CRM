import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    function handleLogout() {

        logout();

        navigate("/");

    }

    return (

        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">

                    Dashboard

                </h1>

                <p className="text-sm text-slate-500">

                    Welcome back to TicketFlow CRM

                </p>

            </div>

            <div className="flex items-center gap-5">

                <div className="relative">

                    <input
                        type="text"
                        placeholder="Search tickets..."
                        className="w-80 rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <span className="absolute left-4 top-3.5 text-slate-400">

                        🔍

                    </span>

                </div>

                <button className="relative text-2xl">

                    🔔

                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>

                </button>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-2">

                    <div className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">

                        A

                    </div>

                    <div>

                        <p className="font-semibold">

                            Aeron

                        </p>

                        <p className="text-sm text-slate-500">

                            Administrator

                        </p>

                    </div>

                </div>

                <button

                    onClick={handleLogout}

                    className="rounded-xl bg-red-500 px-5 py-3 text-white hover:bg-red-600 transition"

                >

                    Logout

                </button>

            </div>

        </header>

    );

}

export default Navbar;