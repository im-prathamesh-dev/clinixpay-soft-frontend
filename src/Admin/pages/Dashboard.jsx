import StatCard from "../components/StatCard";

const Dashboard = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Overview</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Stores" value="128" />
        <StatCard title="Active Licenses" value="102" />
        <StatCard title="Expired Licenses" value="26" />
        <StatCard title="Monthly Revenue" value="₹1,45,000" />
      </div>
    </>
  );
};

export default Dashboard;
