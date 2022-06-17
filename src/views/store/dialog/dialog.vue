<template>
      <!-- 这是编辑的组件 -->
    <el-dialog v-model="modelValue" title="编辑">
      <el-form :model="temp_show" label-width="120px">
        <el-form-item label="产品名称:">
          <el-input v-model="temp_show.name" />
        </el-form-item>
        <el-form-item label="是否上架:">
          <el-select
            v-model="temp_show.status"
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
</template>

<script lang="ts">
import { defineComponent,ref,reactive,watch, toRef, toRefs,computed } from 'vue'
import { ElMessage, ElMessageBox ,} from "element-plus";
interface product {
  name: string; //商品名称
  status: number; //是否已经上架 存在0|1 0表示没有上架1则相反
  price: number; //价格
  quantity : number,
  images: string[]; //图片的链接
}
export default defineComponent({
    props:["modelValue"],
    emits :['update:modelValue'],
    setup(props,context) {
        let indexEdit: number = 0;
         const dialogTableVisible = ref(false);
        let {modelValue} = toRefs(props)
         const productStore: product[] = reactive([
        {
            name: "iphone13",
            status: 0,
            price: 5999,
            quantity : 10,
            images: [
            "https://img11.360buyimg.com/n1/s450x450_jfs/t1/87519/37/24763/52492/62284901Eb9ef3ca9/295d9e455f94c225.jpg.avif",
            ],
        },
        {
            name: "iphone12",
            status: 0,
            price: 4999,
            quantity : 5,
            images: [
            "https://img11.360buyimg.com/n1/s450x450_jfs/t1/87519/37/24763/52492/62284901Eb9ef3ca9/295d9e455f94c225.jpg.avif",
            ],
        },
        ]);
     let temp_show = ref<product>({
      name : "",
      status:0,
      price : 0,
      quantity : 0,
      images :['']
    });
    // 编辑的函数
    const handleEdit = (item:product,index : number) => {
      indexEdit = index;
      modelValue.value = true;
      temp_show.value = {
        name :item.name,
        status:item.status,
        price : item.price,
        quantity : item.quantity,
        images : [ "https://img11.360buyimg.com/n1/s450x450_jfs/t1/87519/37/24763/52492/62284901Eb9ef3ca9/295d9e455f94c225.jpg.avif"]
      }
    };
    // 确认修改表单的函数
    const handle_confirm = () => {
      productStore[indexEdit] = temp_show.value;
      dialogTableVisible.value = false;
      console.log(productStore[indexEdit])
    };
    // 删除按钮的逻辑
    const delete_button = (index: number) => {
      ElMessageBox.confirm("你确定要删除吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          productStore.splice(index, 1);
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

    const handlecancel=()=>{
        context.emit("update:modelValue",false)
    }
        return {
        dialogTableVisible,
        handleEdit,
        handle_confirm,
        delete_button,
        temp_show,
        modelValue,
        handlecancel
        // count
        }
    },
})
</script>

<style scoped>

</style>