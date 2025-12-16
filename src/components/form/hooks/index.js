import { reactive, markRaw } from 'vue'
import { isVueComponentDefinition } from '../components/componentMap.js'
export const useForm = (props) => {
  const schemaProps = props.schema.map((item) => {
    return {
      ...item,
      label: item.label,
      field: item.field,
      component: isVueComponentDefinition(item.component) ? markRaw(item.component) : item.component,
      componentProps: item.componentProps
    }
  })
  const register = (e) => {
    return {
      schema: schemaProps,
      el: e,
      formConfig: props.formConfig
    }
  }
  return [register]
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