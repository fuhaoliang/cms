<template>
  <div class="allArticle">
    <div class="header">
      <h2 class="header-title">文章</h2>
      <el-button type="mini"><router-link to="/article/write-article">写文章</router-link></el-button>
    </div>
    <div class="screen-box">
      <div class="screen-header">
        <p>全部({{ allDataInfo.totalCount }})</p>
        <p class="excision">|</p>
        <p>已发布({{ allDataInfo.puliceCount }})</p>
      </div>
      <div class="screen-content">
        <el-select
          v-model="queryObj.public"
          class="appSelect"
          placeholder="请选择"
          size="small">
          <el-option label="全部" value=""/>
          <el-option label="草稿" value="0"/>
          <el-option label="已发布" value="1"/>
        </el-select>
        <el-date-picker
          v-model="queryObj.modifyDate"
          :picker-options="pickerOptions"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          size="small" />
        <el-select
          v-model="queryObj.tagArr"
          multiple
          class="appSelect"
          placeholder="标签"
          size="small">
          <el-option
            v-for="item in tagsData"
            :key="item.tagName"
            :label="item.tagName"
            :value="item.tagName" />
        </el-select>
        <el-button type="small" @click="getArticles()">筛选</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        v-loading="loading"
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
          prop="modifyDate"
          label="修改时间"
          align="center"
          width="200"
          sortable >
          <template slot-scope="scope">
            <span style="margin-left: 5px">{{ $moment(scope.row.modifyDate).format('YYYY-MM-DD hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文章标题"
          align="center"
          width="200"
          prop="title"
          sortable>
          <!-- <template slot-scope="props"></template> -->
        </el-table-column>
        <el-table-column
          prop="name"
          label="作者"
          width="120"
          sortable />
        <el-table-column
          prop="public"
          label="是否发布"
          width="120"
          sortable />
        <el-table-column
          prop="articleLink"
          align="center"
          label="文章地址" />
        <el-table-column
          label="标签"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.tagArr" :key="index" class="article-tag">
              {{ item }}
            </el-tag>
          </template>
        </el-table-column>
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
              size="small"><router-link :to="{path: '/article/write-article', query:{ id: scope.row.id } }">编辑</router-link></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="open(scope.row.id, 'delete')" />
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button> -->
      </div>
      <div class="pagination">
        <el-pagination
          :current-page="pageObj.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          :total="pageObj.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </div>
  </div>
</template>
<script>
import Http from '@/utils/http'
export default {
  name: 'AllArticle',
  data () {
    return {
      loading: false,
      tagsData: [],
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
      tableData: [],
      queryObj: {
        public: '',
        tagArr: [],
        modifyDate: []
      },
      pageObj: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      allDataInfo: {
        totalCount: 0,
        puliceCount: 0
      },
      multipleSelection: []
    }
  },
  computed: {
    currentPage () {
      const { pagesize, total } = this.pageObj
      return Math.ceil(total / pagesize)
    }
  },
  mounted () {
    this.getArticles()
    this.getArticlesCount()
  },
  methods: {
    open (id, type) {
      const textObj = {
        title: '此操作将永久删除该文章, 是否继续?',
        des: '提示',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }
      this.$confirm(textObj.title, textObj.des, textObj)
        .then(async () => {
          await this.delArticle(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async delArticle (id) {
      const { status } = await Http.articleApi.delArticle({ id }, { loading: true, show: true })
      if (status.code === 0) {
        this.$message.success('删除成功')
        this.getArticles()
      }
    },
    async getArticlesCount () {
      const { status, data } = await Http.articleApi.getArticlesCount()
      if (status.code === 0) {
        const { tagArr, totalCount, puliceCount } = data
        this.tagsData = tagArr
        this.allDataInfo = {
          totalCount,
          puliceCount
        }
      }
    },
    async getArticles () {
      const { queryObj, pageObj } = this
      let { tagArr, modifyDate = [] } = queryObj
      if (modifyDate === null) modifyDate = []
      tagArr = JSON.stringify(tagArr)
      modifyDate = JSON.stringify(modifyDate)
      this.loading = true
      const { status, data } = await Http.articleApi.getArticles({ ...queryObj, tagArr, modifyDate, ...pageObj })
      if (status.code === 0) {
        const { data: articles, pageObj } = data
        this.tableData = articles
        this.pageObj = pageObj
      }
      this.loading = false
    },
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
    },
    handleSizeChange (pagesize) {
      this.pageObj.pagesize = pagesize
      this.getArticles()
    },
    handleCurrentChange (page) {
      this.pageObj.page = page
      this.getArticles()
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
  .article-tag{
    margin: 0 3px;
  }
  .pagination{
    /deep/ .el-pagination{
      width: fit-content;
      margin: 0 auto;
    }
  }
}
</style>
