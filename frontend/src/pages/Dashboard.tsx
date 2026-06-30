import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import DashboardCard from "../components/dashboard/DashboardCard";
import RecentTickets from "../components/dashboard/RecentTickets";

import { getDashboardStats } from "../services/dashboard";

function Dashboard() {

    const [stats, setStats] = useState({

        total_tickets: 0,

        open_tickets: 0,

        pending_tickets: 0,

        closed_tickets: 0,

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const data = await getDashboardStats();

            setStats(data);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <MainLayout>

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-800">

                    Dashboard

                </h1>

                <p className="text-slate-500 mt-2">

                    Welcome back. Here's an overview of your support tickets.

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <DashboardCard
                    title="Total Tickets"
                    value={stats.total_tickets}
                    color="bg-blue-500"
                    icon="🎫"
                />

                <DashboardCard
                    title="Open Tickets"
                    value={stats.open_tickets}
                    color="bg-green-500"
                    icon="🟢"
                />

                <DashboardCard
                    title="Pending Tickets"
                    value={stats.pending_tickets}
                    color="bg-yellow-500"
                    icon="⏳"
                />

                <DashboardCard
                    title="Closed Tickets"
                    value={stats.closed_tickets}
                    color="bg-red-500"
                    icon="✅"
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">

                <div className="xl:col-span-2">

                    <RecentTickets />

                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

                    <h2 className="text-xl font-semibold mb-6">

                        Recent Activity

                    </h2>

                    <div className="space-y-6">

                        <div>

                            <p className="font-medium">

                                Ticket Assigned

                            </p>

                            <p className="text-sm text-slate-500">

                                5 minutes ago

                            </p>

                        </div>

                        <div>

                            <p className="font-medium">

                                Ticket Closed

                            </p>

                            <p className="text-sm text-slate-500">

                                20 minutes ago

                            </p>

                        </div>

                        <div>

                            <p className="font-medium">

                                New Ticket Created

                            </p>

                            <p className="text-sm text-slate-500">

                                1 hour ago

                            </p>

                        </div>

                        <div>

                            <p className="font-medium">

                                Priority Updated

                            </p>

                            <p className="text-sm text-slate-500">

                                2 hours ago

                            </p>

                        </div>

                        <div>

                            <p className="font-medium">

                                Ticket Reassigned

                            </p>

                            <p className="text-sm text-slate-500">

                                Yesterday

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;