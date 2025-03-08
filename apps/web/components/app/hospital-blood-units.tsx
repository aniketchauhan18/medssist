interface IBloodUnits {
  "A+": number;
  "A-": number;
  "B+": number;
  "B-": number;
  "AB+": number;
  "AB-": number;
  "O+": number;
  "O-": number;
}

export default function HospitalBloodUnits({
  bloodUnits,
}: {
  bloodUnits: IBloodUnits;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 text-red-800">
      <div className="">
        <div className="rounded-lg p-2 border border-red-200">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-lg text-red-800">A+</h4>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-800">
              {bloodUnits["A+"]}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg p-2 border border-red-200">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-lg text-red-800">A-</h4>
          </div>
          <div className="text-2xl font-bold text-red-800">
            {bloodUnits["A-"]}
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg p-2 border border-red-200">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-lg text-red-800">B+</h4>
          </div>
          <div className="text-2xl font-bold text-red-800">
            {bloodUnits["B+"]}
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg p-2 border border-red-200">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-lg text-red-800">B-</h4>
          </div>
          <div className="text-2xl font-bold text-red-800">
            {bloodUnits["B-"]}
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg p-2 border border-red-200">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-lg text-red-800">AB+</h4>
          </div>
          <div className="text-2xl font-bold text-red-800">
            {bloodUnits["AB+"]}
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg p-2 border border-red-200">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-lg text-red-800">AB-</h4>
          </div>
          <div className="text-2xl font-bold text-red-800">
            {bloodUnits["AB-"]}
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg p-2 border border-red-200">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-lg text-red-800">O+</h4>
          </div>
          <div className="text-2xl font-bold text-red-800">
            {bloodUnits["O+"]}
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg p-2 border border-red-200">
          <div className="flex justify-between items-center">
            <h4 className="font-light text-lg text-red-800">O-</h4>
          </div>
          <div className="text-2xl font-bold text-red-800">
            {bloodUnits["O-"]}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
