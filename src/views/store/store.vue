<template>
  <div>
     <!-- 这里面放table -->
     <my-table @edit="handleEdit"> </my-table>
      <!-- 对话框 -->
      <el-dialog v-model="dialogTableVisible" title="编辑">
      <el-form :model="temp_show" label-width="120px">
        <el-form-item label="产品名称:">
          <el-input v-model="temp_show.name" />
        </el-form-item>
        <el-form-item label="是否上架:">
          <el-select
            v-model="temp_show.nowstatus"
          >
            <el-option label="上架" value="1" />
            <el-option label="未上架" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格:">
          <el-input v-model="temp_show.price" />
        </el-form-item>
         <el-form-item label="数量:">
          <el-input v-model="temp_show.quantity" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handle_confirm">确定</el-button>
          <el-button @click="handlecancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>    
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive,onMounted } from "vue";
import { Timer } from "@element-plus/icons-vue";
import { Plus } from '@element-plus/icons-vue'
import myTable from './mytTble/myTable.vue'
import myDialog from './dialog/dialog.vue'
import { ElMessage, ElMessageBox ,} from "element-plus";
import Request from '../../network/axiosFun/httpNetwork'
interface product {
  name: string; //商品名称
  nowstatus: number; //是否已经上架 存在0|1 0表示没有上架1则相反
  price: number; //价格
  quantity : number, //数量
  type :string //类型
  remarks : string //备注
  time ?: number
}
export default defineComponent({
  name: "store",
  setup() {
    onMounted(()=>{
      Request("/api/getstore").then(res=>{
        console.log(res);
      })
    })
     const dialogTableVisible = ref(false);
    function handleEdit(e:any){
      dialogTableVisible.value = !dialogTableVisible.value;
    }
    let temp_show = ref<product>({
      name : "",
      nowstatus:0,
      price : 0,
      quantity : 0,
      type : "",
      remarks : "",
    });
    const handlecancel =()=>{
      console.log("取消")
    }
      const handle_confirm = () => {
       dialogTableVisible.value = !dialogTableVisible.value;
    };

    // 删除按钮的逻辑
    const delete_button = (index: number) => {
      ElMessageBox.confirm("你确定要删除吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // productStore.splice(index, 1);
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    };
    return {
     handleEdit,dialogTableVisible,temp_show,handle_confirm,handlecancel
    };
  },
  components: {
    Timer,Plus,myTable,myDialog,
  },
});
</script>

<style scoped>
.tableStyle {
  width: 100%;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
