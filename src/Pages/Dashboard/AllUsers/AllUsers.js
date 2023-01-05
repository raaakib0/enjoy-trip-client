import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';
// import Header from '../../Shared/Header/Header';

const AllUsers = () => {
  const [deletingUser, setDeletingUser] = useState(null);
  // console.log(deletingUser);

  const closeModal = () => {
    setDeletingUser(null);
  }

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://enjoy-trip-server.vercel.app/users');
      const data = await res.json();
      return data;
    }
  });

  const handleMakeSeller = id => {
    fetch(`https://enjoy-trip-server.vercel.app/users/seller/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Make seller successful.')
          refetch();
        }
      })
  }
  const handleRemoveSeller = id => {
    fetch(`https://enjoy-trip-server.vercel.app/users/removeSeller/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Remove seller successful.')
          refetch();
        }
      })
  }
  const handleMakeAdmin = id => {
    fetch(`https://enjoy-trip-server.vercel.app/users/admin/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Make admin successful.')
          refetch();
        }
      })
  }
  const handleRemoveAdmin = id => {
    fetch(`https://enjoy-trip-server.vercel.app/users/removeAdmin/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Remove admin successful.')
          refetch();
        }
      })
  }

  const handleDeleteUser = user => {
    // console.log(user)
    fetch(`https://enjoy-trip-server.vercel.app/users/${user._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Vehicle ${user.name} deleted successfully`)
        }
      })
  }

  return (
    <div>
      <h2 className="text-3xl">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Seller</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, i) => <tr key={user._id} >
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role2 == true && <button onClick={() => handleMakeSeller(user._id)} className='btn btn-xs btn-primary mr-1'>Make Seller</button>}
                  {user?.role2 == "seller" && <button onClick={() => handleRemoveSeller(user._id)} className='btn btn-xs btn-error'>Remove Seller</button>}
                </td>
                <td>
                  {user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}
                  {user?.role == 'admin' && <button onClick={() => handleRemoveAdmin(user._id)} className='btn btn-xs btn-error'>Remove Admin</button>}
                </td>
                {/* <td><button className='btn btn-xs btn-primary'>Make Admin</button></td> */}
                {/* <td><button className='btn btn-xs btn-danger'>Delete</button></td> */}
                <td>
                  <label onClick={() => setDeletingUser(user)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
      {
        deletingUser && <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingUser.name}. It cannot be undone.`}
          successAction={handleDeleteUser}
          successButtonName="Delete"
          modalData={deletingUser}
          closeModal={closeModal}
        >
        </ConfirmationModal>
      }
    </div>
  );
};

export default AllUsers;