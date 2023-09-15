import logo from './logo.svg';
import './App.css';
import PieChartExplosion from './chart';
import BaseChart from './chartjs';
import BarChart from './d3';
import D3Kpi from './d3';
import FunnelChart from './Canvasjs';
import GoogleChart from './GoogleChart';
import MyChart from './GoogleChart1';

function App() {
  const data = [
    { month: 'Jan', sales: 160 },
    { month: 'Feb', sales: 200 },
    { month: 'Mar', sales: 150 },
    { month: 'Jun', sales: 130 },

    // Add more data points as needed
  ];

  const funnelChartData = [
    { y: 1400, label: "Prospects" },
    { y: 1212, label: "Qualified Prospects" },
    { y: 1080, label: "Proposals" },
    { y: 665, label: "Negotiation" },
    { y: 578, label: "Final Sales" },
  ];

  const kpiData = 42;
  return (
    <div className="App">
      {/* <PieChartExplosion/>
      <h1>Chart JS</h1>
      <BaseChart/>
      <BarChart data={data}/>K
      <D3Kpi data={data}/>
      <h1>Funnel chart using Canvas Js</h1>
      <FunnelChart/> */}

      <h1>Google Chart</h1>
      <GoogleChart/><br/>
      {/* <MyChart/> */}
    </div>
  );
}

export default App;
