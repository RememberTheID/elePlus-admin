export const useTable = (props) => {
  const register = (e) => {
    return {
      config: props.formConfig,
      el: e,
      tableConfig: props.tableConfig
    }
  }
  return [register]
}