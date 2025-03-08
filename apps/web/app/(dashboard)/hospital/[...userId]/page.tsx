import {
  getFilteredMedicines,
  getHospitalByUserId,
  getMedicinesByHospitalId,
} from "@/lib/data";
import { notFound } from "next/navigation";
import ConnectWallet from "@/components/app/buttons/connect-wallet";
import { Ambulance, Bed, ClipboardList, HandHeart } from "lucide-react";
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
import HospitalMedicines from "@/components/app/hospital-medicines";
import { Button } from "@/components/ui/button";
import HospitalBloodUnits from "@/components/app/hospital-blood-units";
import MedicineSearch from "@/components/app/medicine-search";

interface HospitalDashboardParams {
  params: Promise<{
    userId: string;
  }>;
  searchParams?: Promise<{
    search?: string;
  }>;
}

export default async function HospitalDashboard({
  params,
  searchParams,
}: HospitalDashboardParams) {
  const { userId } = await params;
  const hospital = await getHospitalByUserId(userId);
  const medicines = await getMedicinesByHospitalId(hospital._id);
  const search = (await searchParams)?.search || ".*";

  const filteredMedicines =
    (await getFilteredMedicines(await search, hospital._id)) || [];
  console.log(filteredMedicines);

  if (!hospital) {
    notFound();
  }

  const TOTAL_DRUGS = medicines?.length;
  // TODO: add a minimum threshold for the items in the hospital
  return (
    <main className="py-5">
      <div className="px-10 flex justify-between gap-5 items-center">
        <div>
          <h3 className="text-dodger-blue-800 font-bold text-xl lg:text-2xl">
            Medssist Dashboard
          </h3>
          <p className="text-neutral-800">
            {hospital.name}, {hospital.address.state}
          </p>
        </div>
        <ConnectWallet />
      </div>
      <div className=" border-[0.25px] border-neutral-100 border-dashed mt-3" />
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 px-10 py-5">
        <div className="bg-blue-100/50 space-y-2 border border-blue-200 rounded-lg p-5">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-dodger-blue-800">Available Drugs</h4>
            <ClipboardList className="text-dodger-blue-800" />
          </div>
          {/* this number will be dynamic fetched from backend */}
          <div className="text-3xl font-bold text-dodger-blue-800">
            {TOTAL_DRUGS}
          </div>
          <div className="flex justify-end items-end">
            <Dialog>
              <DialogTrigger className="cursor-pointer text-dodger-blue-800 text-sm underline">
                More Details
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Available Drugs</DialogTitle>
                  <DialogDescription>
                    {medicines && <HospitalMedicines medicines={medicines} />}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      className="cursor-pointer"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="bg-red-100/50 space-y-2 border border-red-200 rounded-lg p-5">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-red-800">Blood Units</h4>
            <HandHeart className="text-red-800" />
          </div>
          {/* this number will be dynamic fetched from backend */}
          <div className="text-3xl font-bold text-red-800">
            {hospital.bloodStock["A+"] +
              hospital.bloodStock["A-"] +
              hospital.bloodStock["B+"] +
              hospital.bloodStock["B-"] +
              hospital.bloodStock["AB+"] +
              hospital.bloodStock["AB-"] +
              hospital.bloodStock["O+"] +
              hospital.bloodStock["O-"]}
          </div>
          <div className="flex justify-end items-end">
            <Dialog>
              <DialogTrigger className="cursor-pointer text-red-800 text-sm underline">
                More Details
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Available Blood</DialogTitle>
                  <DialogDescription className="pt-5">
                    {hospital.bloodStock && (
                      <HospitalBloodUnits bloodUnits={hospital.bloodStock} />
                    )}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      className="cursor-pointer"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="bg-green-100/50 space-y-2 border border-green-200 rounded-lg p-5">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-green-800">Ambulances</h4>
            <Ambulance className="text-green-800" />
          </div>
          {/* this number will be dynamic fetched from backend */}
          <div className="text-3xl font-bold text-green-800">
            {hospital.ambulances}
          </div>
          <p className="text-green-800 text-sm">Available in your area</p>
        </div>
        <div className="bg-yellow-100/50 space-y-2 border border-yellow-200 rounded-lg p-5">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-yellow-800">Bed Count</h4>
            <Bed className="text-yellow-800" />
          </div>
          {/* this number will be dynamic fetched from backend */}
          <div className="text-3xl font-bold text-yellow-800">
            {hospital.bedCount}
          </div>
          <p className="text-yellow-800 text-sm">Currently available</p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5 px-10 py-5">
        <div className="col-span-3 h-96 border p-5  rounded-lg">
          <h3>Emergency Alerts</h3>
        </div>
        <div className="col-span-2">
          <MedicineSearch medicines={filteredMedicines} />
        </div>
      </div>
    </main>
  );
}
