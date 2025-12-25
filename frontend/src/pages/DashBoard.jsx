
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";


export default function Dashboard() {

    const { state} = useLocation();
    const score = state.result.score;

    const data = [
        {name : "Score" , value : score},
        {name : "Remaining" , value : 100 - score}
    ];

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="card text-center">
                <h2 className="text-xl font-bold mb-2">{state.result.status}</h2>
                <p className="mb-4">{state.result.recommendation}</p>

                <PieChart width={220} height={220}>
                    <Pie data={data} dataKey="value" innerRadius={60}>
                        <Cell fill="#4f4635"/>
                        <Cell fill="#e5e7eb"/>
                    </Pie>
                </PieChart>
            </div>
        </div>

    )
}
