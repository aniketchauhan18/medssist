"use client";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

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

export default function MedicineSearch({
  medicines,
}: {
  medicines: IMedicines[];
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const search = searchParams.get("search");

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    const fullPath = `${window.location.origin}${pathName}?${params.toString()}`;
    router.push(fullPath);
  }, 300);

  const inputClasses =
    "shadow-none bg-neutral-50/30 border focus-visible:ring-0";
  return (
    <div className="p-5 border rounded-lg h-96">
      <h3 className="text-dodger-blue-800 font-bold text-xl lg:text-2xl">
        Drug Availability Search
      </h3>
      <div className="py-3">
        <Input
          placeholder="Search for drugs / medication"
          className={inputClasses}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={search ?? ""}
        />
      </div>
      <div className="flex flex-col gap-2">
        {medicines &&
          medicines.map((medicine) => {
            return <div key={medicine._id} className="px-3 py-1 border rounded-md">
              {medicine.name}
            </div>;
          })}
      </div>
    </div>
  );
}
