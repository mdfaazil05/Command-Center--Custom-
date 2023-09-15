import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Box } from "@mui/material";

Chart.register(CategoryScale);

const initialData = {
  labels: ['A', 'B', 'C', 'D', 'E'],
  datasets: [
    {
      label: 'Initial Data',
      data: [10, 20, 30, 40, 50],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
    },
  ],
};

const drillDownData = {
  labels: [`Sub-A`, `Sub-B`, `Sub-C`, `Sub-D`, `Sub-E`],
  datasets: [
    {
      label: 'Drill-Down Data',
      data: [5, 10, 15, 20, 25],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
    },
  ],
};

const BaseChart = () => {
  const [chartData, setChartData] = useState(initialData);

  const handleSegmentClick = (_, segments) => {
    if (segments.length > 0) {
      const clickedSegmentIndex = segments[0].index;
      // In a Pie Chart, we have only one dataset, so datasetIndex is always 0.
      if (clickedSegmentIndex >= 0) {
        // Drill down into the data
        console.log("clicked from chartjs",segments);
        setChartData(drillDownData);
      }
    }
  };

  return (
    <Box sx={{height:"40%",width:"40%"}}>
      <h2>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          onClick: handleSegmentClick,
        }}
      />
    </Box>
  );
};

export default BaseChart;
