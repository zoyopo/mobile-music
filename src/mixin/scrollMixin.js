import BScroll from 'better-scroll'
const mixinScroll = {
  mounted () {
    // this.$refs.container.addEventListener('touchend', () => {
    //   this.$refs.container.style['padding-top'] = this.transformDelta + 'px'
    // }, false)
    // this.$refs.container.addEventListener('click', (e) => {
    //   e.preventDefault()
    // }, false)
  },
//   watch: {
//     ldDataFinished () {
//       this.$nextTick(() => {
//       debugger
//         if (this.ldDataFinished) {
//             debugger
//           this.scroll = new BScroll(this.$refs.wrapper, {})
//         }
//       })
//     }
//   }
  updated () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
    // this.$nextTick(() => {
    // //   debugger
    // //   if (this.ldDataFinished) {
    //    // debugger

    // //   }
    // })
  }
}

export default mixinScroll
