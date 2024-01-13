import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import 'bootstrap/dist/css/bootstrap.min.css';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);


type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
>;

interface EChartComponentProps {
  // Add any necessary props here
}

const EChartComponent: React.FC<EChartComponentProps> = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const HighPerformer = [34,56,55,66,67,52,42,52,14];
      const Resignation = [11,33,50,81,43,27,8,21,43];

      // Calculate percentages
      const totalHighPerformer = HighPerformer.reduce((sum, value) => sum + value, 0);
      const totalResignation = Resignation.reduce((sum, value) => sum + value, 0);

      const percentageHighPerformer = HighPerformer.map((value) => (value / totalHighPerformer) * 100);
      const percentageResignation = Resignation.map((value) => (value / totalResignation) * 100);

      const option: EChartsOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params: any) {
            return `${params[0].name}: ${params[0].value.toFixed(2)}%`;
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel: {
            formatter: function (value: number) {
              return `${(value).toFixed(2)}%`;
            },
            rotate: 0, 
            
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#333'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['Operations', 'Sales', 'IT', 'HR', 'Finance', 'Customer Support', 'Marketing', 'Office of CEO', 'Product']
        },
        series: [
          {
            name: 'High Performer',
            type: 'bar',
            data: percentageHighPerformer,
            itemStyle: {
              color: '#6DB9EF' 
            },
            label: {
              show: true,
              position: 'right',
              formatter: function (params: any){
                return `${params.value.toFixed(2)}%`;
              }
            }
          },
          {
            name: 'Resignation',
            type: 'bar',
            data: percentageResignation,
            itemStyle: {
              color: '#EE7214' 
            },
            label: {
              show: true,
              position: 'right',
              formatter: function (params: any){
                return `${params.value.toFixed(2)}%`;
              }
            }
          }
        ]
      };

      myChart.setOption(option);

      // Optional: Handle window resize
      const handleResize = () => {
        myChart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        myChart.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};



export default EChartComponent;


