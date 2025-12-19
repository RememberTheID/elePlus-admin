import { computed, unref } from 'vue'

export const useWaterBg = (props) => {
  return computed(() => {
    const text = unref(props.text) || '机密水印'
    const fontSize = unref(props.fontSize) || 16
    const color = unref(props.color) || 'rgba(180, 180, 180, 0.3)'
    const gap = unref(props.gap) || 200
    const angle = unref(props.angle) || -20
    const describe = unref(props.describe) || ''

    if (typeof document === 'undefined') return ''

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // 画布设为 2x2 单元格的总大小
    const canvasSize = gap * 2
    canvas.width = canvasSize
    canvas.height = canvasSize

    if (ctx) {
      ctx.fillStyle = color
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // 封装：传入中心点坐标进行绘制
      const drawWatermark = (centerX, centerY) => {
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate((angle * Math.PI) / 180)

        // 主文字
        ctx.font = `${fontSize}px sans-serif`
        ctx.fillText(text, 0, describe ? -fontSize / 2 : 0)

        // 描述文字
        if (describe) {
          ctx.font = `${fontSize * 0.75}px sans-serif`
          ctx.fillText(describe, 0, fontSize / 2 + 5)
        }
        ctx.restore()
      }

      drawWatermark(gap / 2, gap / 2)
      drawWatermark(gap + gap / 2, gap + gap / 2)
    }

    return canvas.toDataURL('image/png')
  })
}
