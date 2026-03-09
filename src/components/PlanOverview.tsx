const PlanOverview = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-3">Fat Loss Plan</h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <b>Start Weight:</b> 125 kg
        </p>
        <p>
          <b>Daily Calories:</b> 1500–1700
        </p>
        <p>
          <b>Protein:</b> Eggs, Chicken, Fish, Lamb/Mutton
        </p>

        <div className="mt-4">
          <p className="font-semibold">Weekly Training</p>

          <ul className="list-disc ml-5 text-sm">
            <li>Mon – Strength + Walk</li>
            <li>Tue – Brisk Walk</li>
            <li>Wed – Strength</li>
            <li>Thu – Badminton</li>
            <li>Fri – Recovery Walk</li>
            <li>Sat – Strength</li>
            <li>Sun – Long Walk</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanOverview;
