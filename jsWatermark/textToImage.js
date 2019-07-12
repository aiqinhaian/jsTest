const defaults = {
  debug: false,
  maxWidth: 2000,
  fontSize: 18,
  lineHeight: 28,
  margin: 10,
  bgColor: '#fff',
  textColor: '#efefef',
  fontFamily: 'PingFangSC-Regular',
  height: 2000,
  rotate: 0,
  fillTextX: 10, // 开始绘制文字的 X 坐标
  fillTextY: 10, // 开始绘制文字的 Y 坐标
  showTime: 1,
  lineSpace: 0,
  marginX: 0,
  marginY: 0,
}

const generateImage = (content, config) => {
  const conf = {
    ...defaults,
    ...config,
  }

  const canvas = document.createElement('canvas')
  if (!canvas) {
    console.log('当前浏览器不支持生成 canvas')
    return ''
  }
  const ctx = canvas.getContext('2d')
  ctx.font = `${conf.fontSize}px ${conf.fontFamily}`
  const text = ctx.measureText(content)
  const space = Math.abs(Math.sin(conf.rotate * Math.PI / 180) * text.width)
  const canvas2 = document.createElement('canvas')
  canvas2.width = text.width + conf.marginX * 2 + space
  canvas2.height = conf.fontSize + conf.marginY * 2 + space
  const ctx2 = canvas2.getContext('2d')
  ctx2.font = `${conf.fontSize}px ${conf.fontFamily}`
  ctx2.rotate(conf.rotate * Math.PI / 180)
  ctx2.fillStyle = conf.textColor
  ctx2.textBaseline = 'top'

  ctx2.fillText(content, conf.fillTextX, conf.fillTextY + space)

  return canvas2.toDataURL()
}

// export default generateImage

