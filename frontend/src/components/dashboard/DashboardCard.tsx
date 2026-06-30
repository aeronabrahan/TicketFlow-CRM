interface Props {

    title: string;

    value: number;

    color: string;

    icon: string;

}

function DashboardCard({

    title,

    value,

    color,

    icon

}: Props) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition duration-300 overflow-hidden">

            <div
                className={`h-2 ${color}`}
            />

            <div className="p-6">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-slate-500">

                            {title}

                        </p>

                        <h2 className="text-5xl font-bold mt-4">

                            {value}

                        </h2>

                    </div>

                    <div className="text-5xl">

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;