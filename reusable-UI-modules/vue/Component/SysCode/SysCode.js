import Vue from 'vue'
import { getSysCode } from '@/api/system/dictDetail'

export default class SysCode {
  constructor(sysCode) {
    this.sysCode = sysCode
  }

  async init(names, completeCallback) {
    if (names === undefined || name === null) {
      throw new Error('need sysCode names')
    }
    const ps = []
    names.forEach(n => {
      Vue.set(this.sysCode.dict, n, {})
      Vue.set(this.sysCode.label, n, {})
      Vue.set(this.sysCode, n, [])
      ps.push(getSysCode(n).then(data => {
        this.sysCode[n].splice(0, 0, ...data)
        data.forEach(d => {
          if (parseInt(d.value).toString() != 'NaN') {
            d.value = parseInt(d.value)
          }
          Vue.set(this.sysCode.dict[n], d.value, d)
          Vue.set(this.sysCode.label[n], d.value, d.label)
        })
      }))
    })
    await Promise.all(ps)
    completeCallback()
  }
}
