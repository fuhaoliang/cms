<template>
  <div>
    <el-upload
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePictureCardPreview"
      class="avatar-uploader"
      action=""
    >
      <img v-if="coverUrl" :src="coverUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Http from '@/utils/http'
export default {
  props: {
    coverUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {
    imageUrl () {
      this.$emit('update:coverUrl', this.imageUrl)
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.$emit('update:coverUrl', this.imageUrl)
      this.dialogVisible = true
    },
    async beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      console.info('file', file)
      const fd = new FormData()
      fd.append('file', file)
      const { status, data } = await Http.userApi.uploadImage(fd)
      if (status.code === 0) {
        console.info('data.file--->', data.file)
        this.imageUrl = data.file
        this.$message.success('上传成功, 请记得保存')
      } if (status.code === -1) {
        this.$message.error(status.msg)
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 150px;
    display: block;
  }
</style>
