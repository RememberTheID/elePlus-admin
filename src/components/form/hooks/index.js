import { reactive, markRaw, ref, unref } from 'vue'
import { omit } from 'lodash-es'
import { isVueComponentDefinition } from '../components/componentMap.js'
import { isFunction } from 'lodash-es'
export const useForm = (props) => {
  const schema = ref(unref(props.schema))
  const formRef = ref({
    events: {}
  })
  let formConfig = {}
  const validate = async () => {
    const { validForm } = await formRef.value.events
    return validForm() || {}
  }
  const setProps = async (obj = {}) => {
    const { setSchemaConfig } = await formRef.value.events
    Object.assign(formConfig, obj)
    setSchemaConfig(formConfig)
  }
  const schemaProps = unref(schema).map((item) => {
    return {
      ...item,
      label: item.label,
      field: item.field,
      component: isVueComponentDefinition(item.component) ? markRaw(item.component) : item.component,
      componentProps: isFunction(item.componentProps) ? item.componentProps(formRef) : item.componentProps
    }
  })
  const register = (e) => {
    formRef.value = e
    return {
      schema: schemaProps,
      el: e,
      formConfig: props.config || {}
    }
  }
  return [register, {
    validate,
    setProps
  }]
}
export const useStateReactive = (fn) => {
  const state = reactive(fn())
  const reset = () => {
    Object.keys(state).forEach((key) => {
      delete state[key]
    })
    Object.assign(state, fn())
  }
  return [state, reset]
}