import type { ITest } from '../util/ITest'
import { Pane } from 'tweakpane'
import { Random } from 'mockjs'
import { Text } from 'pixi.js'
import Stats from 'stats.js'

class TextBenchMark implements ITest {
  pane: Pane
  count = 5000
  range = 2000
  stats: Stats

  init() {
    this.initPane()
    this.initStats()
  }

  initPane() {
    const pane = new Pane()
    this.pane = pane
    pane.addButton({ title: `create ${this.count}` }).on('click', () => {
      this.createText(this.count)
    })
    pane.addButton({ title: 'remove all' }).on('click', () => {
      this.removeAllText()
    })
    pane.addButton({ title: 'destroy all' }).on('click', () => {
      this.destroyAllText()
    })
  }

  createText(count: number) {
    const root = pixiEntry.root
    const half = this.range / 2
    for (let i = 0; i < count; i++) {
      const str = Random.cname()
      const text = new Text(str)
      text.style.fill = Random.color()
      text.x = Random.float(-half, half)
      text.y = Random.float(-half, half)
      root.addChild(text)
    }
  }

  removeAllText() {
    const root = pixiEntry.root
    root.removeChildren()
  }

  destroyAllText() {
    const children = pixiEntry.root.children.concat()
    for (const child of children) {
      child.destroy()
    }
  }

  initStats() {
    const stats = new Stats()
    document.body.appendChild(stats.dom)

    pixiEntry.ticker.add(() => {
      stats.update()
    })
    stats.showPanel(2)

    const sytle = stats.dom.style
    sytle.left = '50px'
    sytle.top = '50px'
    sytle.transform = 'scale(2)'
  }
}

export const textBenchMark = new TextBenchMark()
