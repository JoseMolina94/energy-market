'use client'

type EnergyLoaderProps = {
  size?: number
  fullScreen?: boolean
}

export default function Loader({ size = 48, fullScreen = false }: EnergyLoaderProps) {
  return (
    <div 
      className={
        fullScreen 
        ? "w-screen h-screen flex flex-col items-center justify-center" 
        : "flex flex-col items-center justify-center"
      }
    >
      <div
        className="animate-pulse-scale origin-bottom text-yellow-400"
        style={{ fontSize: `${size}px` }}
      >
        ⚡
      </div>
      <span>Cargando...</span>
    </div>
  )
}
