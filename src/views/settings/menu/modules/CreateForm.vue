<template>
  <a-modal
    title="新建菜单"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id']" disabled />
        </a-form-item>

        <a-form-item label="上级菜单">
          <a-input v-decorator="['parentId', {rules: [{required: true, message: '请选择上级菜单！'}], initialValue: 0}]" />
        </a-form-item>

        <a-form-item label="名称">
          <a-input v-decorator="['routerName', {rules: [{required: true, message: '请输入菜单名称！'}]}]" />
        </a-form-item>

        <a-form-item label="组件">
          <a-input v-decorator="['component', {rules: [{required: true, message: '请输入组件名称！'}]}]" />
        </a-form-item>

        <a-form-item label="路径">
          <a-input v-decorator="['routerPath', {rules: [{required: true, message: '请输入访问路径！'}]}]" />
        </a-form-item>

        <a-form-item label="redirect">
          <a-input v-decorator="['redirect', {rules: [{required: false, message: '请输入重定向路径！'}]}]" />
        </a-form-item>
        <!--meta-->
        <a-form-item label="标题">
          <a-input v-decorator="['title', {rules: [{required: true, message: '请输入菜单标题！'}]}]" />
        </a-form-item>

        <a-form-item label="icon">
          <a-input v-decorator="['icon', {rules: [{required: false}], initialValue: ''}]" />
        </a-form-item>

        <a-form-item label="keepAlive">
          <a-switch size="small" v-decorator="['keepAlive', {rules: [{required: false}], initialValue: false}]"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'parentId', 'routerName', 'component', 'routerPath', 'redirect', 'title', 'icon', 'keepAlive']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
