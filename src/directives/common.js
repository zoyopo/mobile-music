export const join = {

  bind (el, binding, vnode) {
    let value = binding.value
    if (Object.prototype.toString.call([]) !== Object.prototype.toString.call(value)) {
      throw new Error('请传入数组类型绑定值')
    }
    value.forEach((item, index) => {
        // 最后一个特殊处理-符
      if (index + 1 === value.length) {
        el.innerHTML += `<a href="${item.url || '#'}">${item.name}</a>`
      } else {
        el.innerHTML += `<a href="${item.url || '#'}">${item.name} - </a>`
      }
    })
  }
}
