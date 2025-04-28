import { PixiComp } from './pixi/PixiComp'
import { globalUtil } from './utils/global-util'
import 'antd/dist/reset.css'

globalUtil.init()

function App() {
  return <PixiComp />
}

export default App
