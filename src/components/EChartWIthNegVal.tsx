import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | BarSeriesOption
>;

interface EChartWithNegValProps {
  // Add any necessary props here
}

const EChartWithNegVal: React.FC<EChartWithNegValProps> = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const labelRight = {
        position: 'right'
      } as const;

      // Replace HighPerformer and Resignation with your actual data
      const HighPerformer = [34,56,55,66,67,52,42,52,14];
      const Resignation = [11,33,50,81,43,27,8,21,43];

      // Calculate percentages
      const totalHighPerformer = HighPerformer.reduce((sum, value) => sum + value, 0);
      const totalResignation = Resignation.reduce((sum, value) => sum + value, 0);

      const percentageHighPerformer = HighPerformer.map((value) => (value / totalHighPerformer) * 100);
      const percentageResignation = Resignation.map((value) => (value / totalResignation) * 100);

      // Calculate the percentage difference or provide your own logic
      const percentageDifference = percentageHighPerformer.map((value, index) => value - percentageResignation[index]);

      const seriesData = percentageDifference.map((diff, index) => ({
        value: diff,
        label: {
          show: true,
          position: diff > 0 ? 'right' : 'left',

          formatter:function (params: any){
                return `${params.value.toFixed(2)}%`;
              }

        } as any  // Use any type
      }));

      const option: EChartsOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params: any) => {
            const dataIndex = params[0].dataIndex;
            const tooltipText = `
              High Performer: ${HighPerformer[dataIndex]}<br/>
              Resignation: ${Resignation[dataIndex]}<br/>
              Difference: ${(percentageDifference[dataIndex] !== undefined ? percentageDifference[dataIndex].toFixed(2) : 'N/A')}%
            `;
            return tooltipText;
          }
        },
        grid: {
          top: 80,
          bottom: 30
        },
        xAxis: {
          type: 'value',
          position: 'bottom',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            name: 'Cost',
            type: 'bar',
            stack: 'Total' as const,
            data: seriesData
          }
        ]
      };

      option && myChart.setOption(option);

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

export default EChartWithNegVal;
