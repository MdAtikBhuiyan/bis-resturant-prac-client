import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({

        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', 
            // {
            //     headers: {
            //         authorization: `Bearer ${localStorage.getItem('access-resturant-token')}`
            //     }
            // }
            )
            return res.data;
        }

    })


    const handleDeleteUser = user => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user?._id}`)
                    .then(res => {
                        if (res.data?.deletedCount > 0) {
                            // update user
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })


            }
        });

    }


    const handleMakeAdmin = user => {

        axiosSecure.patch(`/users/admin/${user?._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data?.modifiedCount > 0) {

                    // user collection reUpload after making user to admin
                    refetch()

                    Swal.fire({
                        position: 'top-end',
                        title: "Admin Success",
                        text: `${user?.name} is an admin Now!`,
                        icon: "success",
                        timer: 1500
                    });
                }
            })


    }


    return (
        <div>

            <div className="flex justify-evenly my-4">
                <h3 className="text-3xl">All Users:  </h3>
                <h3 className="text-3xl">Total Users: {users.length}</h3>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, idx) => (
                                    <tr key={user?._id}>
                                        <th>{idx + 1}</th>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            {
                                                user?.role === 'admin' ?
                                                    <span>Admin</span>
                                                    :
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        className="btn btn-warning">
                                                        <FaUsers className="text-white text-xl" />
                                                    </button>
                                            }
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="btn btn-ghost">
                                                <FaTrashAlt className="text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AllUsers;