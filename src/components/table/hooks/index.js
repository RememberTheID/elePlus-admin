export const useTable = (props) => {
  const register = (e) => {
    return {
      schema: props.schema,
      el: e
    }
  }
  return [register]
}