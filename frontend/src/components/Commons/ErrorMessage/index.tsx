
type ErrorMessageProps = {
  message?: string
}

export default function ErrorMessage({ message = 'Error al cargar' } : ErrorMessageProps) {

  return (
    <div className="flex flex-col gap-2">
      <span className="text-6xl text-red-700 font-bold">
        X
      </span>
      <p>{message}</p>
    </div>
  )
}