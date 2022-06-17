import { onMounted,ref } from "vue";
import * as echarts from 'echarts';
import Request from '../network/axiosFun/httpNetwork'
import {useRouter} from "vue-router"
type EChartsOption = echarts.EChartsOption;
// 这是一个测试用的柱状图
export function region(ID:string){
    onMounted(()=>{
        const chartDom = document.getElementById(ID)!;
        const myChart = echarts.init(chartDom);
        const option :EChartsOption = {
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
        }
        option && myChart.setOption(option);
    })
    
}

interface ViewArray{
  id : number,
  address : string,
  quantity : number
}
interface NetworkStatus{
  data : ViewArray[]
  msg:string,
  status: number
}
// type viewdata = ViewArray[] & NetworkStatus;
// 各地区销售情况图
export function sale(ID:string,address?:string[],summary?:number[]){
  const sale_address =ref<string[]>([]) ;
  const sale_value =ref<number[]>([]) ;
  const option:EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      // 如果单位显示不全可以修改图表的间距
      top:"3%",
      left: '3%',
      right: '10%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      name:"元",
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel:{
        // x轴值的设置
        color : "white",
        show :true,
        margin : 10
      },
      splitLine:{
        show:false
      },
      splitNumber :5,
      min:0,
      //设置为data数据中的最大值为显示的值
      max:"dataMax",
      // minInterval :20
      // 在轴上显示单位
      nameLocation : "end",
      // 单位的样式
      nameTextStyle:{
        fontSize : 18,
        padding :2,
        color : "#fff"
      }
    },
    yAxis: {
      inverse :true ,
      type: 'category',
      data:sale_address.value, //需要向服务器请求的数据
      axisLabel:{
        color : "white"
      },
      minorTick:{
        show : false
      }
    },
    series: [
      {
        // name: '111',
        realtimeSort:true,
        type: 'bar',
        data: sale_value.value, //需要向服务器请求的数据
        stack : 'total',
        emphasis :{
           itemStyle:{
              // color : "pink"
           },
           focus: 'series',
            label:{
              show :true,
              position : "right",
              color : "yellow",
              fontSize :14,
              fontWeight:"bold",
              shadowBlur :24
            },
        },
        barWidth : 10,
       colorBy : "series",
       label : {

       },
       
      },
    ],
     color :'#00fd90',
     visualMap : {
       show :false,
       min:0,
       dimension : 0,
       inRange:{
         opacity :[0.3,1]
       }
     }
  };
  onMounted(()=>{
    const chartDom = document.getElementById(ID)!;
    const myChart = echarts.init(chartDom);
    // 发送网络请求
    Request("/getviewdata").then((res)=>{
      // console.log(res.data.status == 1001)
      if(res.status ==200 && res.data.status != 1001){
           const temp_res:NetworkStatus = res.data;
           if(temp_res.status == 200){
             const temp_res_data:ViewArray[] = temp_res.data;
            temp_res_data.forEach((item:ViewArray)=>{
              sale_address.value.push(item.address)
              sale_value.value.push(item.quantity)
            })
            option && myChart.setOption(option);
           }
      }else {
        alert("登陆已过期")
        window.location.href = "/login"
      }
   }
   )
        window.addEventListener("resize", function() {
          myChart.resize()
          console.log("窗口被重新调整")
        })
  })
}