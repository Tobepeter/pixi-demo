import { pixiEntry } from '../pixi/PixiEntry'
import { pixiTest } from '../pixi/PixiTest'
import { pixiInput } from '../pixi/util/PixiInput'
import * as PIXI from 'pixi.js'

class GlobalUtil {
  init() {
    this.injectUnplugin()
  }

  /**
   * 注入一些高频使用对象
   * @desc 注意这些对象不要在static的部分使用，只能在runtime使用
   */
  injectUnplugin() {
    const win = window as any
    win.win = win
    win.pixiEntry = pixiEntry
    win.PIXI = PIXI
  }
}

export const globalUtil = new GlobalUtil()

declare global {
  const win: any
  const pixiEntry: typeof import('../pixi/PixiEntry').pixiEntry
  const PIXI: typeof import('pixi.js')
}
