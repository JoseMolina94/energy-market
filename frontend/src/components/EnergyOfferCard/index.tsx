import { Offer } from "@/types/Offer"

type EnergyOfferCardProps = {
  offer: Offer
}

export default function EnergyOfferCard (props: EnergyOfferCardProps) {
  const { offer } = props

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow rounded space-y-2">
      <div className="text-center block border rounded-md w-fit p-2">
        <span className="text-6xl">⚡</span> 
        <p className="font-semibold text-lg" >{offer.kWh} kWh</p>
      </div>

      <p className="text-center text-xl font-bold">
        $ {offer.pricePerKWh}/kWh
      </p>

      <div>
        <p className="text-xs">
          <strong>Desde: </strong> 
          <span>{new Date(offer.availableFrom).toLocaleString()}</span>
        </p>
        <p className="text-xs">
          <strong >Hasta: </strong>
          <span>{new Date(offer.availableTo).toLocaleString()}</span>
        </p>
      </div>
    </div>
  )
}