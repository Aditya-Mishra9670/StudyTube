import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleViewUsers = () => {
        navigate("/admin/all-users");
    };
    const handleViewReports = () => {
        navigate("/admin/reports");
    }

    return (
        <div className="m-10 p-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">All Users</h2>
                    <p className="">View all users</p>
                    <button onClick={handleViewUsers} className="btn btn-primary mt-4">View Users</button>
                </div>
                
                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">Create Notification</h2>
                    <p className="">Send notifications to users</p>
                    <button className="btn btn-success mt-4">Create Notification</button>
                </div>
                
                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">Reports</h2>
                    <p className="">View all reports</p>
                    <button onClick={handleViewReports} className="btn btn-warning mt-4">View Reports</button>
                </div>
                
                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">Specific Report</h2>
                    <p className="">View a specific report</p>
                    <button className="btn btn-accent mt-4">View Report</button>
                </div>
                
                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">Remove User</h2>
                    <p className="">Remove a user from the system</p>
                    <button className="btn btn-error mt-4">Remove User</button>
                </div>
                
                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">Review Report</h2>
                    <p className="">Review submitted reports</p>
                    <button className="btn btn-info mt-4">Review Report</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;