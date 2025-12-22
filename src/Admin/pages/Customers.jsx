// demo page of react 
import { useState, useEffect } from "react";
import axios from "axios";
const Customers = () => {
  const [customers, setCustomers] = useState([]);
    const token = localStorage.getItem("adminToken");
    useEffect(() => {
    const fetchCustomers = async () => {
        try {
        const res = await axios.get(
            "http://localhost:5000/api/admin/customers",
            {
            headers: { Authorization: `Bearer ${token}` }
            }
        );
        setCustomers(res.data.customers);
        }
        catch (error) {
        console.log(error);
        }
    };
    if (token) fetchCustomers();
    }, [token]);
    return (
    <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Customers</h2>
        <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
            <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            </tr>
        </thead>    
        <tbody>
            {customers.map((customer) => (
            <tr key={customer._id}>
                <td className="py-2 px-4 border-b">{customer.fullName.firstName} {customer.fullName.lastName}</td>
                <td className="py-2 px-4 border-b">{customer.email}</td>
                <td className="py-2 px-4 border-b">{customer.contactNo}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
};
export default Customers;