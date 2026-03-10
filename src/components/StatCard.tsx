interface Props {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: Props) => {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatCard;
