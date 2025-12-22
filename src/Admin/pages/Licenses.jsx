const Licenses = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        License & Revenue
      </h2>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Store</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Expiry</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3">Om Medical</td>
            <td>Standard</td>
            <td className="text-green-600">Active</td>
            <td>12-Dec-2025</td>
            <td>₹12,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Licenses;
