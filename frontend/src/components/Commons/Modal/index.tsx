

type ModalProps = {
  confirm?: () => void
  cancel?: () => void
  message: string
  isOpen: boolean
  confirmButtonText?: string
  cancelButtonText?: string
}

export default function Modal(props: ModalProps) {
  const {
    confirm = () => { },
    cancel = () => { },
    message,
    isOpen,
    confirmButtonText = 'Confirmar',
    cancelButtonText = 'Cancelar'
  } = props

  return (
    isOpen &&
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <p className="text-lg font-semibold mb-4">
          {message}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              cancel()
            }}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={() => {
              confirm()

            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}