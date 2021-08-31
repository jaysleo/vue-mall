<template>
  <div class="editor">
    <div ref="editorForm"></div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'Editor',
  props: {
    // 传递过来的编辑器内容参数
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 真正的编辑器里的内容
      editorContent: '',
      // 编辑器对象
      editor: null
    }
  },
  watch: {
    // 当父组件的内容变化时需要更新编辑器的内容
    content() {
      this.editor.txt.html(this.content);
    }
  },
  mounted() {
    // 初始化
    this.editor = new E(this.$refs.editorForm);
    // 当编辑器内容变化的时候通知父组件
    this.editor.config.onchange = (html) => {
      this.editorContent = html;
      // 通知父级控件方法
      this.$emit('editorContent', html);
    }
    // 配置上传图片接口地址
    // this.editor.config.uploadImgServer = '/upload-img';
    this.editor.config.uploadImgShowBase64 = true;
    // 配置菜单栏，设置不需要的菜单
    this.editor.config.excludeMenus = [
      'todo',
      'emoticon',
      'video'
    ]
    this.editor.create();
    this.editor.txt.html(this.content);
  }
}
</script>
<style lang="scss">

</style>