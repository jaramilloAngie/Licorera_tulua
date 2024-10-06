import React, { useEffect, useState } from 'react';
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        status: "",
        _id: ""
    });

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include',
            });
            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Error al obtener la lista de usuarios.");
        }
    };

    const deleteUser = async (userId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            try {
                const response = await fetch(SummaryApi.deleteUser.url, { // Usar la URL correcta
                    method: SummaryApi.deleteUser.method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: userId }) // Enviar el ID del usuario

                    
                
                });

                const dataResponse = await response.json();
                if (dataResponse.success) {
                    toast.success("Usuario eliminado exitosamente.");
                    fetchAllUsers(); // Actualizar la lista de usuarios
                } else {
                    toast.error(dataResponse.message);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                toast.error("Error al eliminar el usuario.");
            }
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-green text-white'>
                        <th>Nr.</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Estado </th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map((el, index) => (
                        <tr key={el._id}>
                            <td>{index + 1}</td>
                            <td>{el?.name}</td>
                            <td>{el?.email}</td>
                            <td>{el?.role}</td>
                            <td>{el?.status}</td>
                            <td>
                                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                    onClick={() => {
                                        setUpdateUserDetails(el);
                                        setOpenUpdateRole(true);
                                    }}
                                >
                                    <MdModeEdit />
                                </button>
                                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white' 
                                    onClick={() => deleteUser(el._id)}
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openUpdateRole && (
                <ChangeUserRole 
                    onClose={() => setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    status={updateUserDetails.status}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
}

export default AllUsers;
