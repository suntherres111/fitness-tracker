const ProgressCard = ({
  startWeight,
  currentWeight,
  targetWeight,
}: {
  startWeight: number;
  currentWeight: number;
  targetWeight: number;
}) => {
  const totalLossNeeded = startWeight - targetWeight;
  const lostSoFar = startWeight - currentWeight;

  let progress = 0;

  if (totalLossNeeded > 0) {
    progress = Math.min(100, Math.max(0, (lostSoFar / totalLossNeeded) * 100));
  }

  const barColor =
    progress < 30
      ? "bg-red-500"
      : progress < 70
        ? "bg-yellow-500"
        : "bg-green-500";

  const analyticColor =
    progress > 0
      ? "text-emerald-600"
      : progress == 0
        ? "text-cyan-600"
        : "text-red-600";

  return (
    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500 text-sm mb-2">Goal Progress</p>

      <p className={`${analyticColor} text-2xl font-bold mb-3`}>
        {progress.toFixed(1)}%
      </p>

      {/* Progress bar */}

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${barColor} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${Math.max(progress, 3)}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{startWeight} kg</span>

        <span>{targetWeight} kg</span>
      </div>
    </div>
  );
};

export default ProgressCard;
