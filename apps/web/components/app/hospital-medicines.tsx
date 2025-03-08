import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface IMedicines {
  _id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: Date;
  pricePerUnit: number;
  quantity: number;
  isPrescriptionRequired: boolean;
  category: string;
  hospitalId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export default async function HospitalMedicines({
  medicines,
}: {
  medicines: IMedicines[];
}) {
  return (
    <ScrollArea className="w-84 sm:w-[29rem] border-none whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {medicines.map((medicine) => (
          <div key={medicine._id} className="shrink-0 border p-5 ">
            <h3 className="text-neutral-700 font-bold text-lg">
              {medicine.name}
            </h3>
            <div>Manufacturer: {medicine.manufacturer}</div>
            <div className="flex">
              Batch No: <p className="underline ml-1">{medicine.batchNumber}</p>
            </div>
            <div>Expiry Date: {medicine.expiryDate.toDateString()}</div>
            <div>Quantity: {medicine.quantity}</div>
            <div>Price Per Unit: ₹{medicine.pricePerUnit}</div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
