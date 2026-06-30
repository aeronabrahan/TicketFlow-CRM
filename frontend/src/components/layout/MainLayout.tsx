import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
    children: React.ReactNode;
}

function MainLayout({ children }: Props) {

    return (

        <div className="min-h-screen flex bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default MainLayout;