import { createRef } from 'react'

type TooltipProps = {
  children: React.ReactNode
  tooltipText: string
}

export const Tooltip = ({ children, tooltipText }: TooltipProps) => {
  const tipRef = createRef<HTMLDivElement>()

  function handleMouseEnter() {
    if (tipRef.current) {
      tipRef.current.style.opacity = '1'
      tipRef.current.style.marginLeft = '15px'
    }
  }
  function handleMouseLeave() {
    if (tipRef.current) {
      tipRef.current.style.opacity = '0'
      tipRef.current.style.marginLeft = '8px'
    }
  }

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white px-4 py-2 rounded flex items-center transition-all duration-150"
        style={{ left: '100%', opacity: 0 }}
        ref={tipRef}
      >
        <div
          className="bg-black h-3 w-3 absolute"
          style={{ left: '-6px', transform: 'rotate(45deg)' }}
        />
        <p className="text-xs">{tooltipText}</p>
      </div>
      {children}
    </div>
  )
}
