import { Offer } from "@/types/Offer"

type EnergyOfferCardProps = {
  offer: Offer
}

export default function EnergyOfferCard (props: EnergyOfferCardProps) {
  const { offer } = props

  return (
    <div key={offer._id} className="p-4 bg-white shadow rounded">
      <p>
        <strong>kWh: </strong> 
        {offer.kWh}
      </p>
      <p>
        <strong>Precio: </strong> 
        ${offer.pricePerKWh}/kWh
      </p>
      <p>
        <strong>Desde: </strong> 
        {new Date(offer.availableFrom).toLocaleString()}
      </p>
      <p>
        <strong>Hasta: </strong> 
        {new Date(offer.availableTo).toLocaleString()}
      </p>
    </div>
  )
}