import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/admin/allUsers')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="container mx-auto p-4 h-full">
            <h1 className="text-3xl font-bold mb-8 text-center">All Users</h1>
            {users.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <h2 className="text-2xl font-semibold ">No Data Available</h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map(user => (
                        <div key={user.id} className="card bg-base-100 shadow-lg rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-2 ">{user.name}</h2>
                            <p className="">{user.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllUsers;
