<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="入库时间" prop="date" />
    <el-table-column label="产品名称" prop="name" />
    <el-table-column label="单价" prop="name" />
    <el-table-column label="数量" prop="name" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, ref,defineComponent } from 'vue'
interface User {
  date: string
  name: string
  address: string
}
export default defineComponent({
    setup(props,context){
    const search = ref('')
    const filterTableData = computed(() =>
     tableData.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
    context.emit('edit',{index,row})
//   console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
    return {
        search,filterTableData,handleEdit,handleDelete,tableData
    }
    }
})

</script>
