
import * as echarts from 'echarts'

export default function (chartType, container) {
  const echartsInstance = echarts.init(container, null)
  const option = {
    // 是否显示提示框组件。
    tooltip: {
      trigger: 'item'
    },
    // 图例
    legend: {
      orient: 'vertical',
      top: 'center',
      right: '-10',
      padding: 10,
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        name: 'Access From',
        type: chartType,
        radius: ['30%', '50%'],
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        lableLine: {
          show: 'false'
        }
      }
    ]
  }
  echartsInstance.setOption(option)
}