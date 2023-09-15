import React,{useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { Grid } from "@mui/material";

const GoogleChart=()=>{

  const [data,setData]=useState();
  const [data1,setData1]=useState();
  const[options,setOptions]=useState();
  const[options1,setOptions1]=useState();
  const [viewHistory, setViewHistory] = useState([]);
    // const[q,setQ]=useState("Chennai");
    const [ChartTypes,setChartTypes]=useState("PieChart");
      const days=3;
    const[loading,setLoading]=useState(true);
      useEffect(()=>{
        const First=async()=>{
          
          const options1 = {
            title: "Temperature in different places",
            
            hAxis: {
              title: 'Place', // Set x-axis label
            },
            vAxis: {
              title: 'Temperature', // Set y-axis label
            },
          };
          setOptions(options1);
        const temp=await GetData("chennai");
        
        console.log("UseEffect",temp)
        const Data1=[["Place","Temperature"],
        ["Chennai",temp?.current?.temp_c],
        ["London",temp?.current?.temp_c],
        ["Paris",temp?.current?.temp_c],
        ["Birmingham",temp?.current?.temp_c],] 
        setData(Data1
        )
        setLoading(false);
        setViewHistory([...viewHistory, { data: Data1, options: options1 }]);
   
      }
      First();
      },[]);

      const GetData=async(q)=>{
      const options1 = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params:{q,days},
        headers: {
          'X-RapidAPI-Key': 'f975f26eb2mshe985ed1001f4ea5p1c87e4jsnb3e181c3e99b',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      };
      try {
        // console.log("check5 q",q);
        const response=await axios.request(options1);
        console.log("check from api.js",response.data);
        return response.data;
      } 
      catch (error) {
        console.error(error);}
      }


      const handleSelect = async(selection) => {
        if (selection.length === 1) {
            const selectedSegmentIndex = selection[0].row;
            const selectedSegmentData = data[selectedSegmentIndex+1];
            try{
            console.log('Selected Segment', data[selectedSegmentIndex+1]);

            const tempData=await GetData(selectedSegmentData[0]);
            const D1=tempData?.forecast?.forecastday[0]?.hour.map((item,index)=>index+1);
            const D2=tempData?.forecast?.forecastday[0]?.hour.map((item)=>item?.temp_c);
            console.log("Time",D1,"Temperature",D2,"TempData",tempData);
            setChartTypes("ColumnChart");
          //   setData([
          //     ["Time","Temp"],
          //     `${D1}`,D2
          // ])
          const options2 = {
            title: 'Temperature vs. Time',
            'animation': {startup: true,
              'easing' :'inAndOut',
              'duration':500
              },
            hAxis: {
              title: 'Time', // Set x-axis label
            },
            vAxis: {
              title: 'Temp', // Set y-axis label
            },
          };
          setOptions(options2);
          const chartData = [
            ['Time', 'Temp in Deg C'], // Headers
            ...D1.map((time, index) => [time, D2[index]]), // Values
          ];
          setData(chartData);
          setLoading(false);
          setViewHistory([
            ...viewHistory,
            { data: chartData, options: options2 },
          ]);
          console.log("History",viewHistory);
          }
          catch(error){
            alert("Cant get more details");
              console.log(error);
              
            }

        }
      };
      const handleDrillUp = () => {
        // Check if there's a view history and drill up by using the previous view
        if (viewHistory.length > 1) {
          const previousView = viewHistory[viewHistory.length - 2];
          setData(previousView.data);
          setOptions(previousView.options);
    
          // Remove the last view from the history
          setViewHistory(viewHistory.slice(0, -1));
        }
      };

      const chartEvents=[
        {
          eventName: 'select',
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            handleSelect(selection);
          },
        },
      ]
    return (
      <>
      <Grid container spacing={0}> 
      <Grid item lg={5}>{!loading&&<><Chart
          chartType="ColumnChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
          rootProps={{ 'data-testid': '1' }}
          chartEvents={chartEvents}
        />
        {viewHistory.length > 1 && 
          <button
            // variant="outlined"
            // color="primary"
            onClick={handleDrillUp}
          >
            Drill Up
          </button>
        }
        </>
        }</Grid>
        {/* <Grid item lg={5} sx={{ml:"3%"}}>
        {!loading&&<Chart
          chartType="ColumnChart"
          data={data1}
          options={options1}
          width={"103%"}
          height={"400px"}
          // rootProps={{ 'data-testid': '1' }}
          // chartEvents={chartEvents}
        />}</Grid> */}
</Grid>
        </>
        )
}
export default GoogleChart;