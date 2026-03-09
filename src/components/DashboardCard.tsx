import React from "react";

interface Props {
  title: string;
  value: string;
}

const DashboardCard: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
