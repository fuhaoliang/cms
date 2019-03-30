<template>
  <div class="dashboard-container">
    <tinymce-editor ref="editor"
                    v-model="msg"
                    :disabled="disabled"
                    @onClick="onClick" />
    <button @click="clear">清空内容</button>
    <button @click="disabled = !disabled">禁用</button>
    <button @click="getContent()">获取内容</button>
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor'
export default {
  components: {
    TinymceEditor
  },
  data () {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false
    }
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
    getContent () {
      console.info('content------>', this.msg)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
