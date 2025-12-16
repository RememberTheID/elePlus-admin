import { isVNode, h } from 'vue';
import { ElInput, ElInputNumber, ElSelect } from "element-plus";


export const isVueComponentDefinition = (variable) => {
  return (
    typeof variable === 'object' &&
    variable !== null &&
    (
      typeof variable.setup === 'function' ||
      typeof variable.render === 'function' ||
      typeof variable.data === 'function' ||
      typeof variable.template === 'string' ||
      typeof variable.install === 'function'
    )
  );
}
export const componentMap = new Map()
componentMap.set('Input', ElInput)
componentMap.set('InputNumber', ElInputNumber)
componentMap.set('Select', ElSelect)

export const findComponent = (name) => {
  if (isVNode(name) || isVueComponentDefinition(name)) {
    return h(name);
  }
  return componentMap.get(name)
};