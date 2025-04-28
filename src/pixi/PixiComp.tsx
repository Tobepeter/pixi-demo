import { useRef, useEffect, useCallback } from 'react'
import { pixiEntry } from './PixiEntry'
import { PixiDomHandle, PixiDomUtil } from './util/dom/PixiDomUtil'

export const PixiComp = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<PixiDomHandle>(null)

  useEffect(() => {
    pixiEntry.domHandle = handleRef.current

    if (!pixiEntry.isInited) {
      pixiEntry.init()
    }

    rootRef.current!.appendChild(pixiEntry.canvas)
  }, [])

  const onDomHandle = useCallback((handle: PixiDomHandle) => {
    handleRef.current = handle
  }, [])

  return (
    <>
      <div ref={rootRef} id='pixi-root'></div>
      <PixiDomUtil onHandle={onDomHandle} />
    </>
  )
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    pixiEntry.destroy()
  })
}
