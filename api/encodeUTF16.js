module.exports = function encodeUTF16(str) {
  const arr = []
  if (str) {
    for (let i = 0; i < str.length; i++) {
      const h = str.charCodeAt(i).toString(16)
      const s = h.length >= 4 ? h : new Array(4 - h.length + 1).join('0') + h
      arr.push(s.toUpperCase())
    }
    return arr.join('')
  }
  return ''
}
