import React, { useState } from 'react';
import { Chart } from 'react-google-charts';

const MyChart = () => {
  const [isSummaryView, setIsSummaryView] = useState(true);

  const summaryData = [
    ['Category', 'Value'],
    ['Category 1', 10],
    ['Category 2', 20],
    ['Category 3', 30],
  ];

  const detailedData = [
    ['Detail', 'Value'],
    ['Detail 1', 5],
    ['Detail 2', 10],
    ['Detail 3', 15],
  ];

  const handleDataPointClick = () => {
    // Toggle between summary and detailed view
    setIsSummaryView(!isSummaryView);
  };

  return (
    <div>
      <h1>My Chart</h1>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={isSummaryView ? summaryData : detailedData}
        options={{
          title: isSummaryView ? 'Summary View' : 'Detailed View',
        }}
        chartEvents={[
          {
            eventName: 'select',
            callback: handleDataPointClick,
          },
        ]}
      />
      {isSummaryView ? null : (
        <button onClick={handleDataPointClick}>Back to Summary</button>
      )}
    </div>
  );
};

export default MyChart;
