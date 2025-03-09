"use client"
import React, { useEffect, useState } from "react";

interface IRequest {
    bloodGroup: string;
    id: string;
    requester: string;
    units: string;
}

export default function Client (){

const bloodGroupMap: { [key: number]: string } = {
    1: 'A+',
    2: 'A-',
    3: 'B+',
    4: 'B-',
    5: 'AB+',
    6: 'AB-',
    7: 'O+',
    8: 'O-',
}
    const [activeRequests, setActiveRequests] = useState<IRequest[] | null>(null);

    useEffect(() => {
        getActiveRequests();
    }, []);

    const getActiveRequests = async () => {
        const response = await fetch("https://medssist-server.onrender.com/showActiveRequests", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log( "active requests" , data);
        setActiveRequests(data);
    };

    console.log(activeRequests);
    const handleFulfill = (reservationId: string) => {
        const response = fetch("https://medssist-server.onrender.com/fulfilRequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reservationId,
            }),
        });
        console.log(response);
    };

    return (
        <div className="p-4">
            {activeRequests?.map((request) => (
                <div key={request.id} className="border p-4 mb-4 rounded shadow-md">
                    <p className="text-lg font-semibold">Blood Group: {bloodGroupMap[Number(request.bloodGroup)]}</p>
                    <p className="text-md">Units: {request.units}</p>
                    <p className="text-md">Requester: {request.requester}</p>
                    <p className="text-md">Request ID: {request.id}</p>
                    <button 
                        onClick={() => handleFulfill(request.id)} 
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Fulfill
                    </button>
                </div>
            ))}
        </div>
    );
};