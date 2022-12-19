import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageVehicle = () => {
    const [deletingVehicle, setDeletingVehicle] = useState(null);

    const closeModal = () => {
        setDeletingVehicle(null);
    }


    const { data: vehicles, isLoading, refetch } = useQuery({
        queryKey: ['vehicles'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/vehicles', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    
    const handleDeleteVehicle = vehicle => {
        fetch(`http://localhost:5000/vehicles/${vehicle._id}`, {
            method: 'DELETE', 
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Vehicle ${vehicle.name} deleted successfully`)
            }
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className="text-3xl">Manage Vehicles: {vehicles?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Categories</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vehicles.map((vehicle, i) => <tr key={vehicle._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={vehicle.img} alt="" />
                                    </div>
                                </div></td>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.email}</td>
                                <td>{vehicle.categorie}</td>
                                <td>
                                    <label onClick={() => setDeletingVehicle(vehicle)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingVehicle && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingVehicle.name}. It cannot be undone.`}
                    successAction = {handleDeleteVehicle}
                    successButtonName="Delete"
                    modalData={deletingVehicle}
                    closeModal = {closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default ManageVehicle;