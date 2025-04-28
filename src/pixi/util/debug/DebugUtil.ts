import { pixiTest } from '@/pixi/PixiTest'
import { hmr } from '../Hmr'
import { debugInject } from './DebugInject'
import { debugTexture } from './DebugTexture'
import { debugVisual } from './DebugVisual'
import { pixiInput } from '../PixiInput'
import { Tween, Group } from '@tweenjs/tween.js'

class DebugUtil {
  activeChromeDevtools = true

  @hmr.oneCall
  init() {
    this.initChromeDevtools()
    debugInject.init()
    debugTexture.init()
    debugVisual.init()
    this.initGlobal()
  }

  private initGlobal() {
    win.stage = pixiEntry.stage
    win.app = pixiEntry.app
    win.canvas = pixiEntry.canvas
    win.renderer = pixiEntry.app.renderer
    win.ticker = pixiEntry.ticker

    win.pixiTest = pixiTest
    win.pixiInput = pixiInput

    win.Tween = Tween
    win.TweenGroup = Group
  }

  private initChromeDevtools() {
    if (!this.activeChromeDevtools) return
    // 设置 chrome devtools 扩展对象
    // DOC: https://pixijs.io/devtools/docs/guide/installation/

    // TODO: 不知道为什么，有时候hmr会导致disconnect
    win.__PIXI_APP__ = pixiEntry.app

    Object.defineProperty(win, 'devObj', {
      get: () => {
        return win.$pixi
      },
    })
  }
}

export const debugUtil = new DebugUtil()

// 副作用不好处理，必须reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload()
  })
}
