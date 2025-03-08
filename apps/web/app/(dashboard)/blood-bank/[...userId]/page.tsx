import ConnectWallet from "@/components/app/buttons/connect-wallet";
import { getBloodBankByUserId } from "@/lib/data";
import { Map, List } from "lucide-react";
import BloodCard from "@/components/ui/bloodCard";
// import { Button } from "@/components/ui/button";

interface BloodBankDashboardParams {
  params: {
    userId: string;
  };
}

export default async function BloodBankDashboard({
  params,
}: BloodBankDashboardParams) {
  const { userId } = params;
  const bloodBank = await getBloodBankByUserId(userId);
  console.log(bloodBank);

  return (
    <main className="py-5">
      <div className="px-10 mb-10 flex justify-between gap-5 items-center">
        <div>
          <h3 className="text-dodger-blue-800 font-bold text-xl lg:text-2xl">
            Medssist Dashboard
          </h3>
          <p className="text-neutral-800">
            {bloodBank.name}, {bloodBank.address.state}
          </p>
        </div>
        <ConnectWallet />
      </div>
      <div className="w-full px-10 mx-auto border rounded shadow bg-white">
        <div className="flex justify-center items-center p-4 border-b">
          <div className="flex gap-2">
            <button className="p-2 border rounded">
              <List size={20} />
            </button>
            <button className="p-2 border rounded bg-blue-50">
              <Map size={20} />
            </button>
          </div>
        </div>

        <div key={bloodBank.id} className="border-b p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-semibold">{bloodBank.name}</h2>
              <p className="text-sm text-gray-600">
                {bloodBank.address.city}, {bloodBank.address.state},{" "}
                {bloodBank.address.country}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {bloodBank.isOpen && (
                <span className="text-green-600 text-sm font-medium">
                  Open Now
                </span>
              )}
              <button className="bg-red-600 text-white px-4 py-2 rounded">
                Request Blood
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-3">
            {
              <>
                <BloodCard
                  bloodType={"A+"}
                  quantity={bloodBank.bloodStock["A+"]}
                />
                <BloodCard
                  bloodType={"A-"}
                  quantity={bloodBank.bloodStock["A-"]}
                />
                <BloodCard
                  bloodType={"B+"}
                  quantity={bloodBank.bloodStock["B+"]}
                />
                <BloodCard
                  bloodType={"B-"}
                  quantity={bloodBank.bloodStock["B-"]}
                />
                <BloodCard
                  bloodType={"AB+"}
                  quantity={bloodBank.bloodStock["AB+"]}
                />
                <BloodCard
                  bloodType={"AB-"}
                  quantity={bloodBank.bloodStock["AB-"]}
                />
                <BloodCard
                  bloodType={"O+"}
                  quantity={bloodBank.bloodStock["O+"]}
                />
                <BloodCard
                  bloodType={"O-"}
                  quantity={bloodBank.bloodStock["O-"]}
                />
              </>
            }
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm">
              <div>Contact: {bloodBank.contact.phone}</div>
              <div>Hours: {bloodBank.operatingHours}</div>
            </div>
            <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">
              View Details
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
