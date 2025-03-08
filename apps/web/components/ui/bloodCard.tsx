import React from "react";

const BloodCard = ({
  bloodType,
  quantity,
}: {
  bloodType: string;
  quantity: number;
}) => {
  return (
    <div className={`p-3 rounded text-center`}>
      <div className="text-xl font-bold text-red-600">{bloodType}</div>
      <div className="text-sm">{quantity} units</div>
    </div>
  );
};

export default BloodCard;
