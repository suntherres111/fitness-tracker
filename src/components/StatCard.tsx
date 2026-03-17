interface Props {
  title: string;
  value: string | number;
  valueTextColor: string | null;
}

const StatCard = ({ title, value, valueTextColor }: Props) => {
  if (!valueTextColor) valueTextColor = "black";
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-4xl font-bold mt-1 text-${valueTextColor}-600`}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;
