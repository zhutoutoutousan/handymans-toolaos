import SysCode from './SysCode'

const install = function(Vue) {
  Vue.mixin({
    data() {
      if (this.$options.sysCodes instanceof Array) {
        const sysCode = {
          dict: {},
          label: {}
        }
        return {
          sysCode
        }
      }
      return {}
    },
    created() {
      if (this.$options.sysCodes instanceof Array) {
        new SysCode(this.sysCode).init(this.$options.sysCodes, () => {
          this.$nextTick(() => {
            this.$emit('sysCodeReady')
          })
        })
      }
    }
  })
}

export default { install }
