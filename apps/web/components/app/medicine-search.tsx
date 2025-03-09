"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState,useEffect } from "react";
import { toast } from "sonner";


interface IMedicines {
  genericName: string;
  name: string;
  pricePerUnit: string;
  quantity: string;
  seller: string;
}


export default function MedicineSearch() {
  // const searchParams = useSearchParams();
  // const pathName = usePathname();
  // const router = useRouter();
  // const search = searchParams.get("search");

  const [medicines, setMedicines] = useState<IMedicines[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("https://medssist-server.onrender.com/medicine/getAllMedicines");
        const data = await response.json();
        setMedicines(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    
    fetchMedicines();
  }, []);

  console.log(medicines);

  const reserveMedicines = async (medicineId: number,quantity: Number) => {
    const response = await fetch(`http://localhost:8080/medicine/reserveMedicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medicineId ,
        quantity 
      }),
    });
    console.log(response)
    const data = await response.json();
    toast.success("Medicine Reserved Successfully");
    console.log(data);
  }

  

  // const handleSearch = useDebouncedCallback((searchTerm: string) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (searchTerm) {
  //     params.set("search", searchTerm);
  //   } else {
  //     params.delete("search");
  //   }
  //   const fullPath = `${window.location.origin}${pathName}?${params.toString()}`;
  //   router.push(fullPath);
  // }, 300);

  const inputClasses =
    "shadow-none bg-neutral-50/30 border focus-visible:ring-0";
  return (
    <div className="p-5 border rounded-lg h-96">
      <h3 className="text-dodger-blue-800 font-bold text-xl lg:text-2xl">
        Drug Availability Search
      </h3>
      {/* <div className="py-3">
        <Input
          placeholder="Search for drugs / medication"
          className={inputClasses}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={search ?? ""}
        />
      </div> */}
      <div className="flex flex-col gap-2 mt-6 max-h-48 overflow-y-scroll">
        {medicines &&
          medicines.map((medicine, index) => {
            return <div key={index} className="flex justify-between items-center rounded-sm border px-2 text-sm py-1">
              <div className="flex flex-col">
                <p>{medicine.name}</p>
                <p>
                  <span className="font-bold text-xs">Quantity:</span>{" "}
                  {medicine.quantity}
                </p>
              </div>
              <Dialog>
                <DialogTrigger className="text-xs underline text-green-700 cursor-pointer">Reserve</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Reserve
                    </DialogTitle>
                    <DialogDescription>
                     <div className="text-neutral-800 text-xl">
                      <p>Medicine Id : {index}</p>
                      <p>Medicine Name: {medicine.name}</p>
                      <p>Quantity: {medicine.quantity}</p>
                      <p>Price Per Unit: {medicine.pricePerUnit}</p>
                     </div>
                    </DialogDescription>
                  </DialogHeader>
                  <Button className="cursor-pointer" onClick={() => reserveMedicines(index,5)}>
                    Reserve
                  </Button>
                </DialogContent>
              </Dialog>
            </div>;
          })}
      </div>
    </div>
  );
}
