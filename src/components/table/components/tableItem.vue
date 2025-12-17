<script name="TableItem">
import { h, useSlots } from 'vue'
import { ElTableColumn } from 'element-plus'
import { omit } from 'lodash-es'

export default {
  name: 'TableItem',
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const slotsItem = useSlots()
    const renderColumns = (cols) => {
      return cols.map((item) => {
        const slots = {}
        const slotTableKey = item.slot ? `table-${item.slot}` : null
        if (item.children && item.children.length > 0) {
          slots.default = () => renderColumns(item.children)
        }
        if (slotTableKey && slotsItem[slotTableKey]) {
          slots.default = (scope) => slotsItem[slotTableKey](scope)
        }
        if (item.slotRender) {
          slots.default = (scope) => item.slotRender(scope)
        }
        return h(
          ElTableColumn,
          {
            ...omit(item, ['children']),
            key: item.prop || item.label,
            showOverflowTooltip: true,
          },
          slots
        )
      })
    }
    return () => renderColumns(props.columns)
  }
}
</script>
