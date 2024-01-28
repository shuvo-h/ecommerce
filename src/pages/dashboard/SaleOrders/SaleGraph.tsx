import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  
  /*
  const data = [
    { name: '2015', totalCount: 4000, totalAmount: 2400,  },
    { name: '2016', totalCount: 3000, totalAmount: 1398,  },
    { name: '2017', totalCount: 2000, totalAmount: 9800,  },
    { name: '2018', totalCount: 2780, totalAmount: 3908,  },
    { name: '2019', totalCount: 1890, totalAmount: 4800,  },
    { name: '2020', totalCount: 2390, totalAmount: 3800,  },
    { name: '2021', totalCount: 3490, totalAmount: 4300,  }
  ];
  */
export  type graphRow = {name:string,totalCount:number,totalAmount:number, }
type TSaleGraphProps = {
    data: graphRow[]
}
const SaleGraph = ({data}:TSaleGraphProps) => {
    return (
        <div>
             <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="totalCount" stroke="#82ca9d" />
                </LineChart>
                </ResponsiveContainer>
        </div>
    );
};

export default SaleGraph;