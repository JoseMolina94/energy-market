export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold">⚡Energy Market</h4>
          <p className="text-sm text-gray-400">Tu plataforma para compra y venta de energía.</p>
        </div>

        <div className="text-center md:text-right text-sm">
          <p><span className="font-semibold">Email:</span> contacto@energymarket.com</p>
          <p><span className="font-semibold">Teléfono:</span> +57 300 000 0000</p>
          <p><span className="font-semibold">Dirección:</span> Calle Ficticia 123, Bogotá, Colombia</p>
        </div>
      </div>
    </footer>
  )
}
