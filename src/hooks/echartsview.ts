import { onMounted } from "vue";
import * as echarts from 'echarts';
// 这里可以发起网络请求去获取数据
export default function (){
    type EChartsOption = echarts.EChartsOption;
    onMounted(()=>{
        var chartDom = document.getElementById('main')!;
        var myChart = echarts.init(chartDom);
        var option: EChartsOption;
        option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
            }
        ]
        };
        option && myChart.setOption(option);
    })

}
