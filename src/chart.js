import React, { useRef, useEffect, useState } from 'react';
import './index.css';
import { IgrItemLegend } from 'igniteui-react-charts';
import { IgrPieChart } from 'igniteui-react-charts';
import { IgrPieChartBase, IIgrPieChartBaseProps, IgrSliceClickEventArgs } from 'igniteui-react-charts';

import { IgrItemLegendModule } from 'igniteui-react-charts';
import { IgrPieChartModule } from 'igniteui-react-charts';

IgrPieChartModule.register();
IgrItemLegendModule.register();

const PieChartExplosion = () => {
  const [data] = useState([
    { MarketShare: 37, Company: "Space Cooling", Summary: "Space Cooling 37%" },
    { MarketShare: 25, Company: "Residential Appliance", Summary: "Residential Appliance 25%" },
    { MarketShare: 12, Company: "Heating", Summary: "Heating 12%" },
    { MarketShare: 8, Company: "Lighting", Summary: "Lighting 8%" },
    { MarketShare: 18, Company: "Other Services", Summary: "Other Services 18%" },
  ]);

  const chartRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    if (legendRef.current) {
      chart.legend = legendRef.current;
    }
  }, []);

  const onSliceClick = (s, e) => {
    e.isExploded = !e.isExploded;
    const clickedSlice = data[e.index];
    console.log('Clicked Slice Data:', clickedSlice);
  };

  return (
    <div className="container sample">
      <label className="legend-title">Global Electricity Demand by Energy Use</label>
      <div className="options vertical">
        <IgrItemLegend ref={legendRef} orientation="Horizontal" />
      </div>

      <div className="chart-container" style={{ width: '400px', height: '400px' }}>
        <IgrPieChart
          dataSource={data}
          ref={chartRef}
          labelMemberPath="Summary"
          valueMemberPath="MarketShare"
          legendLabelMemberPath="Company"
          width="100%"
          height="100%"
          labelsPosition="OutsideEnd"
          labelExtent="30"
          explodedRadius={0.2}
          explodedSlices="1"
          allowSliceExplosion={true}
          radiusFactor={0.7}
          sliceClick={onSliceClick}
          startAngle={-60}
        />
      </div>
    </div>
  );
};

export default PieChartExplosion;
