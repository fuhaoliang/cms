<template>
  <div class="allArticle">
    <div class="header">
      <h2 class="header-title">文章</h2>
      <el-button type="mini">写文章</el-button>
    </div>
    <div class="screen-box">
      <div class="screen-header">
        <p>全部(1)</p>
        <p class="excision">|</p>
        <p>已发布(1)</p>
      </div>
      <div class="screen-content">
        <el-select
          v-model="value"
          class="appSelect"
          placeholder="请选择"
          size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
        <el-button type="small">应用</el-button>
        <el-date-picker
          v-model="endTime"
          :picker-options="pickerOptions"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small" />
        <el-select
          v-model="value"
          class="appSelect"
          placeholder="请选择"
          size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
        <el-button type="small">筛选</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          heigth="100"
          width="55" />
        <el-table-column
          label="文章"
          width="120"
          prop="title"
          sortable>
          <!-- <template slot-scope="props"></template> -->
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
          sortable />
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip />
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)">查看</el-button>
            <el-button
              type="text"
              size="small">编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini" />
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AllArticle',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '选项1',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      startTime: '',
      endTime: '',
      tableData: [{
        title: 'a文章',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        title: 'b文章',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      }, {
        title: 'd文章',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        title: 'c文章',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司'
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.info('val', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.allArticle {
  padding: 20px;
  .header {
    display: flex;
    align-content: center;
    .header-title {
      margin: 0;
      margin-right: 20px;
    }
  }
  .screen-box {
    .screen-header {
      display: flex;
      align-content: center;
      .excision {
        margin: 15px 10px;
      }
      p {
        cursor: pointer;
      }
    }
    .screen-content {
      .appSelect {
        width: 150px;
      }
    }
  }
}
</style>
