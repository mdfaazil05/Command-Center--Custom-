// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const D3Kpi = ({ data }) => {
//   const svgRef = useRef(null);

//   useEffect(() => {
//     // D3 code to create the KPI card
//     const svg = d3.select(svgRef.current);

//     // Assuming you have a single data value for your KPI
//     const kpiValue = data;

//     // Set up the KPI card dimensions
//     const width = 200;
//     const height = 100;

//     // Create a group for the KPI card
//     const kpiGroup = svg.append('g')
//       .attr('width', width)
//       .attr('height', height);

//     // Create a rectangle for the card background
//     kpiGroup.append('rect')
//       .attr('width', width)
//       .attr('height', height)
//       .attr('fill', '#f0f0f0');

//     // Display the KPI value
//     kpiGroup.append('text')
//       .attr('x', width / 2)
//       .attr('y', height / 2)
//       .attr('text-anchor', 'middle')
//       .attr('alignment-baseline', 'middle')
//       .text(kpiValue);

//   }, [data]);

//   return (
//     <>
//     <h1>KPI using D3 </h1>
//     <svg ref={svgRef}></svg>
//     </>
//   );
// };

// export default D3Kpi;

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Kpi = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const radius = Math.min(width, height) / 2;

    // Convert data into a format suitable for a pie chart
    const pieData = data.map((item) => ({
      label: item.month,
      value: item.sales,
    }));

    const pie = d3.pie().value((d) => d.value);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pieChart = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arcs = pieChart.selectAll('.arc')
      .data(pie(pieData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.label));

    arcs.append('foreignObject')
      .attr('transform', (d) => {
        const centroid = arc.centroid(d);
        return `translate(${centroid[0]}, ${centroid[1]})`;
      })
      .attr('width', 60)
      .attr('height', 30)
      .append('xhtml:button')
      .attr('class', 'chart-button')
      .text((d) => d.data.label)
      .on('click', (d) => {
        console.log(`Clicked: ${d.data.label}`);
      });
  }, [data]);

  return (
    <div>
      <h1>D3 chart</h1>
      <svg ref={svgRef} width={400} height={400}>
        {/* D3 chart content */}
      </svg>
    </div>
  );
};

export default D3Kpi;

