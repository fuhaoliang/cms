<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
            :init="init"
            :disabled="disabled"/>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/code'
import utils from '@/utils/utils'
import Http from '@/utils/http'
const app = require('../../config/app')

export default {
  components: {
    Editor
  },
  props: {
    // 传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image imagetools media table textcolor wordcount contextmenu code'
    },
    toolbar: {
      type: [String, Array],
      default: 'code | undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    }
  },
  data () {
    const isProd = app.env === 'prod'
    return {
      // 初始化配置
      init: {
        convert_urls: false, // 路径自动转化为相对路径
        language_url: isProd ? '/cms/static/tinymce/langs/zh_CN.js' : '/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: isProd ? '/cms/static/tinymce/skins/lightgray' : '/static/tinymce/skins/lightgray',
        height: 420,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        // automatic_uploads: true,
        // images_upload_url: 'http://127.0.0.1:3000/api/v1/upload',
        automatic_uploads: false,
        image_title: true,
        image_advtab: true,
        images_reuse_filename: true,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: async (blobInfo, success, failure) => {
          // if (blobInfo.filename().indexOf('blobid') > -1) return
          const imgBase64 = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(imgBase64)
          const imgName = blobInfo.name()
          const fileData = utils.dataURLtoFile(imgBase64, imgName)
          const fd = new FormData()
          fd.append('file', fileData)
          const { status, data } = await Http.userApi.uploadImage(fd)
          if (status.code === 0) {
            console.info('data.file--->', data.file)
            success(data.file)
          } if (status.code === -1) {
            failure(status.message)
          }
        }
      },
      myValue: this.value
    }
  },
  watch: {
    value (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear () {
      this.myValue = ''
    }
  }
}

</script>
<style scoped>
</style>

