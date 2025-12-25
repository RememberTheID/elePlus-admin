import { reactive } from 'vue';
export const useTable = (props) => {
  let events = {}
  const reload = () => {
    events?.reload()
  }
  const register = (e) => {
    events = e.events
    return {
      config: props.formConfig,
      el: e,
      tableConfig: props.tableConfig
    }
  }
  return [register, {
    reload
  }]
}