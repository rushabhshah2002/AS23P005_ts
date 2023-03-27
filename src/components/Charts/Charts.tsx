import React from "react";
import {
	BarChart,
	LineChart,
	Bar,
	Line,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const Charts = React.memo(({ data, type, niddleValue }: { data: any; type: "BAR" | "LINE" | "PIE"; niddleValue?: number }) => {
	if (type == "BAR") {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={data}
					margin={{
						top: 5,
						right: 10,
						left: 0,
						bottom: 0,
					}}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="certIssued" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		);
	} else if (type == "LINE") {
		return (
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					data={data}
					margin={{
						top: 5,
						right: 10,
						left: 0,
						bottom: 0,
					}}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="certIssued" stroke="#8884d8" activeDot={{ r: 8 }} />
					<Line type="monotone" dataKey="certIssued" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		);
	} else if (type == "PIE") {
		const RADIAN = Math.PI / 180;
		const cx = 150;
		const cy = 95;
		const iR = 50;
		const oR = 100;
		const value = 50;

		const needle = (value: number, data: Array<any>, cx: number, cy: number, iR: number, oR: number, color: string) => {
			let total = 0;
			data.forEach((v) => {
				total += v.value;
			});
			const ang = 180.0 * (1 - value / total);
			const length = (iR + 2 * oR) / 3;
			const sin = Math.sin(-RADIAN * ang);
			const cos = Math.cos(-RADIAN * ang);
			const r = 5;
			const x0 = cx + 5;
			const y0 = cy + 5;
			const xba = x0 + r * sin;
			const yba = y0 - r * cos;
			const xbb = x0 - r * sin;
			const ybb = y0 + r * cos;
			const xp = x0 + length * cos;
			const yp = y0 + length * sin;

   return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
   ];
  };
  return <ResponsiveContainer width="100%" height="100%">
  <PieChart>
  <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx="15rem"
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
         {data.map((entry : any, index : number) => (
            <Cell key={`cell-${index}`} fill={entry.color}/>
          ))}
        </Pie>
        {needle(niddleValue? niddleValue : value, data, cx, cy, iR, oR, '#d0d000')}
  </PieChart>
 </ResponsiveContainer>
 }
 else {
  return <></>
 }
})
export default Charts;
