import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <aside className="w-64 bg-slate-900 text-white flex flex-col">

            <div className="p-6 text-3xl font-bold border-b border-slate-800">

                TicketFlow

            </div>

            <nav className="flex-1 mt-6">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `mx-3 mb-2 flex items-center rounded-xl px-5 py-3 transition ${
                            isActive
                                ? "bg-slate-800 font-semibold"
                                : "hover:bg-slate-800/60"
                        }`
                    }
                >
                    📊 Dashboard
                </NavLink>

                <NavLink
                    to="/tickets"
                    className={({ isActive }) =>
                        `mx-3 mb-2 flex items-center rounded-xl px-5 py-3 transition ${
                            isActive
                                ? "bg-slate-800 font-semibold"
                                : "hover:bg-slate-800/60"
                        }`
                    }
                >
                    🎫 Tickets
                </NavLink>

            </nav>

        </aside>

    );

}

export default Sidebar;