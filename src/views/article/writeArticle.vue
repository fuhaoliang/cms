<template>
  <el-form ref="writeArticle" :model="blogObj" class="dashboard-container">
    <div class="writeArite-header">
      <div class="writeArite-header-l" >
        <el-input v-model="blogObj.title" placeholder="请输入" size="medium">
          <template slot="prepend">博客标题:</template>
        </el-input>
      </div>
      <div class="writeArite-header-r">
        <el-button v-if="blogObj.public === 0" type="primary" size="small" plain @click="publicArticle()">发布</el-button>
        <el-button v-else type="primary" size="small" plain @click="privateArticle()">下架</el-button>
        <el-button type="primary" size="small" plain @click="saveArticle()">保存</el-button>
        <el-button type="primary" size="small" plain>预览</el-button>
        <el-button type="primary" size="small" plain @click="close()">关闭</el-button>
      </div>
    </div>
    <div class="writeArticle-content">
      <tinymce-editor ref="editor"
                      v-model="blogObj.content"
                      :disabled="disabled"
                      class="editor"
                      @onClick="onClick" />
      <el-collapse accordion class="article-set">
        <el-collapse-item>
          <template slot="title">
            <span class="svg-container">
              <svg-icon icon-class="biaoqian" />标签
            </span>
          </template>
          <el-select
            v-model="blogObj.tagArr"
            class="tags-select"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择文章标签">
            <el-option
              v-for="item in dbTagArr"
              :key="item.id"
              :label="item.tagName"
              :value="item.tagName"/>
          </el-select>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <span class="svg-container">
              <svg-icon icon-class="shijian" />安排
            </span>
          </template>
          <el-radio v-model="blogObj.timeDateType" label="1">自动</el-radio>
          <el-radio v-model="blogObj.timeDateType" label="2">
            <el-date-picker
              v-model="blogObj.timeDate"
              class="date-input"
              prefix-icon="no-icon"
              type="datetime"
              value-format="timestamp"
              placeholder="设置日期"/>
          </el-radio>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <span class="svg-container">
              <svg-icon icon-class="lianjie" />固定连接
            </span>
          </template>
          <el-input v-model="blogObj.articleLink" placeholder="请输入内容">
            <template slot="append">.html</template>
          </el-input>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <span class="svg-container">
              <svg-icon icon-class="shezhi" />选项
            </span>
          </template>
          <div class="comment-box">
            读者评论：
            <el-switch
              v-model="blogObj.isComment"
              active-text="允许"
              inactive-text="不允许"/>
          </div>

        </el-collapse-item>
      </el-collapse>
    <!-- <button @click="clear">清空内容</button>
    <button @click="disabled = !disabled">禁用</button>
    <button @click="getContent()">获取内容</button> -->
    </div>
  </el-form>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor'
import utils from '@/utils/utils'
import Http from '@/utils/http'
export default {
  components: {
    TinymceEditor
  },
  data () {
    return {
      dbTagArr: [],
      blogObj: {
        title: '',
        content: '',
        articleLink: '',
        isComment: true,
        timeDateType: '1',
        timeDate: 0,
        tagArr: [],
        public: 0
      },
      disabled: false,
      id: ''
    }
  },
  watch: {
    'blogObj.timeDateType': {
      handler (val) {
        if (val === '1') this.blogObj.timeDate = new Date().getTime()
      },
      immediate: true
    },
    '$route.query': {
      handler (query) {
        const { id } = query
        this.id = id
      },
      immediate: true
    }
  },
  async mounted () {
    const { id } = this
    await this.getTags()
    if (id) await this.getArticle(id)
    utils.copyData([{
      name: 'blogObj',
      value: this.blogObj
    }])
  },
  methods: {
    // 鼠标单击的事件
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清空内容
    clear () {
      this.$refs.editor.clear()
    },
    close () {
      this.$router.push('/article/all-article')
    },
    async getArticle (id) {
      const { status, data } = await Http.articleApi.getAtricleInfo({ id })
      if (status.code === 0) {
        this.blogObj = data.articleObj
      } else if (status.code === -1) {
        this.$message.error(status.message)
      }
    },
    async publicArticle () {
      this.blogObj.public = 1
      this.saveArticle('发布成功')
    },
    async privateArticle () {
      this.blogObj.public = 0
      this.saveArticle('下架成功')
    },
    async saveArticle (msg) {
      const { blogObj, id } = this
      msg = msg || '保存成功'
      console.info('msg')
      if (id) {
        // 更新文章
        const patchArr = utils.compareData({
          name: 'blogObj',
          value: blogObj
        }, true)
        if (patchArr.length === 0) return this.$message.error('未修改内容')
        const patchObj = {}
        patchArr.forEach(key => (patchObj[key] = blogObj[key]))
        const { status } = await Http.articleApi.patchAtricle({ id, ...patchObj })
        if (status.code === 0) {
          this.$message.success(msg)
          utils.copyData([{
            name: 'blogObj',
            value: blogObj
          }])
        } else if (status.code === -1) {
          this.$message.error(status.message)
        }
      } else {
        // 新建文章
        const { status, data } = await Http.articleApi.addAtricle({ ...blogObj })
        if (status.code === 0) {
          this.$message.success(msg)
          this.$router.replace({ path: 'write-article', query: { id: data.id }})
          utils.copyData([{
            name: 'blogObj',
            value: blogObj
          }])
        } else if (status.code === -1) {
          this.$message.error(status.message)
        }
      }
    },
    async getTags () {
      const { status, data } = await Http.articleApi.getTags()
      if (status.code === 0) {
        this.dbTagArr = data.tagArr
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    padding: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container{
  width: 100%;
  height: 100%;
  position: absolute;
  background: #f2f2f2;
  .writeArite-header{
    margin-bottom: 15px;
    display: flex;
    text-align: center;
    .writeArite-header-l{
      flex: 1;
      display: flex;
      align-items: center;
      p{
        width: 100px;
        text-align: left;
      }
    }
    .writeArite-header-r{
      margin-left: 40px;
      width: 280px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .article-set{
    .svg-icon{
      margin-right: 5px;
      color: #999999;
    }
    /deep/.el-collapse-item__header {
      &:hover{
        background: #edf4ff;
      }
    }
    .tags-select{
      width: 100%;
    }
    .comment-span{
      display: inline-block;
      height: 20px;
      line-height: 20px;
    }
  }
}
.writeArticle-content{
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
   .editor{
    flex: 1
  }
  .svg-container{
    font-size: 16px;
  }
  .article-set{
    margin-left: 40px;
    width: 280px;
    padding: 0 10px;
    background: #ffffff;
  }
  .no-icon{
  }
  /deep/.date-input{
    width: 150px;
    input{
      padding: 0;
      border: none;
    }
  }
  .comment-box{
    display: flex;
    align-items: center;
    font-size: 14px;
  }
}
</style>
