"use client";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";

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

export default function HospitalMedicines({
  medicines,
}: {
  medicines: IMedicines[];
}) {

  const addMedicineOnChain = async (medicine: IMedicines) => {
    console.log(process.env.NEXT_PUBLIC_ORACLE_URL);
    try {
      console.log("hii")
      const response = await fetch(`${process.env.NEXT_PUBLIC_ORACLE_URL}/medicine/addMedicine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: medicine.name,
          genericName: medicine.genericName,
          pricePerUnit: medicine.pricePerUnit,
          quantity: medicine.quantity,
        })
      })
      console.log("hiii")
      console.log(response);
      if (response.ok) {
        const deleteRes = await fetch("/api/register/medicine", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: medicine._id
          })
        })

        const resp = await deleteRes.json();
        console.log(resp);
      }
      const data = await response.json();
      console.log(data);
    } catch(err) {
      console.log(err);
    }
  }
  

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
            <Button onClick={() => addMedicineOnChain(medicine)} className="h-7 text-xs mt-2 cursor-pointer" variant="outline">
              Reserve
            </Button>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
