import { FaLock, FaLockOpen } from "react-icons/fa"
import { FaRegTrashCan } from "react-icons/fa6"
import { IoMdArrowRoundDown } from "react-icons/io"
import { Checkbox } from 'antd';
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { useState } from "react";
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function Dashboard() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [selectAll, setSelectAll] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const queryClient = useQueryClient();

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked
        setSelectAll(isChecked)
        if (isChecked) {
            const allUserIds = users.map(user => user.id)
            setSelectedUsers(allUserIds)
        } else {
            setSelectedUsers([])
        }
    }

    // Selected users
    const handleSelectUser = (userId, isChecked) => {
        if (isChecked) {
            setSelectedUsers([...selectedUsers, userId])
        } else {
            setSelectedUsers(selectedUsers.filter(id => id !== userId))
        }
    }

    // logout
    function handleLogout()  {
        localStorage.removeItem('token')
        navigate('/')
    }
    
    //===================== get All users =========================
    async function getUsers() {
        try {
            const res = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            })
            return res.data
        } 
        catch(err) {
            console.log(err)
        }
    }
    const { data: users } = useQuery({
      queryKey: ["users"],
      queryFn: getUsers,
    });

    // ==================== block users =====================
   const blockUsers = useMutation({
        mutationFn: async () => {
            await axios.post('http://localhost:5000/api/users/update', {
            ids: selectedUsers,
            action: 'block',
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]); // << MUHIM: Foydalanuvchilarni qayta yuklash
            setSelectedUsers([]);
            setSelectAll(false);
        }
    });


    // ==================== Unblock users =====================
   const unBlockUsers = useMutation({
        mutationFn: async () => {
            await axios.post('http://localhost:5000/api/users/update', {
            ids: selectedUsers,
            action: 'unblock',
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            setSelectedUsers([]);
            setSelectAll(false);
        }
    });

    // ==================== delete users =====================
   const deleteUsers = useMutation({
        mutationFn: async () => {
            await axios.post('http://localhost:5000/api/users/update', {
            ids: selectedUsers,
            action: 'delete',
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            setSelectedUsers([]);
            setSelectAll(false);
        }
    });

  return (
    <div className="p-[50px]">
        <div className="flex justify-between items-center mb-[30px] p-[15px]">
            <div className="flex gap-[7px] ">
                <button onClick={() => blockUsers.mutate()} className="active:opacity-[80%] active:bg-[#ffffffd0] flex items-center gap-[10px] border-[2px] border-[#396dec] cursor-pointer rounded-[6px] py-[5px] px-[10px]"> 
                    <FaLock className="text-[#396dec]"/>
                    <span className="text-[#396dec] text-[20px] font-[600]">Block</span>
                </button>
                <button onClick={() => unBlockUsers.mutate()} className="active:opacity-[80%] active:bg-[#ffffffd0] flex items-center gap-[10px] border-[2px] border-[#396dec] cursor-pointer rounded-[6px] px-[10px]"> 
                    <FaLockOpen className="text-[#396dec]"/>
                </button>
                <button onClick={() => deleteUsers.mutate()} className="active:opacity-[80%] active:bg-[#ffffffd0] flex items-center gap-[10px] border-[2px] border-[#ba5364] cursor-pointer rounded-[6px] px-[10px]"> 
                    <FaRegTrashCan className="text-[#ba5364]"/>
                </button>
                <button onClick={handleLogout} className="active:opacity-[80%] active:bg-[#ffffffd0] flex items-center gap-[10px] border-[2px] border-[#ba5364] cursor-pointer rounded-[6px] px-[10px]"> 
                    Logout
                </button>
            </div>
            <div>
                <input type="text" className="text-[#888] p-[10px] border-[1px] rounded-[6px] outline-none" placeholder="Filter"/>
            </div>
        </div>
        <div>
            <table className="w-full">
                <thead>
                    <tr className="border-b-[1px] border-[#c1c1c1] ">
                        <td className="w-[50px] text-center ">
                            <Checkbox  onChange={handleSelectAll} checked={selectAll} value={true}></Checkbox>
                        </td>
                        <td className="text-[20px] font-[700] min-w-[150px] py-[10px]">Name</td>
                        <td className="flex gap-[7px] items-center  py-[10px]">
                            <span className="text-[20px] font-[700]">Email</span>
                            <IoMdArrowRoundDown className="text-[#c1c1c1] text-[20px]"/>
                        </td>
                        <td className="text-[20px] font-[700]  py-[10px]">Last seen</td>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((item) => (
                        <tr key={item.id} className="border-b-[1px] border-[#c1c1c1] ">
                            <td className="w-[50px] text-center ">
                                <Checkbox onChange={(e) => handleSelectUser(item.id, e.target.checked)} checked={selectedUsers.includes(item.id)}></Checkbox>
                            </td>
                            <td className="py-[10px] ">
                                <p className={`text-[20px] font-[500] ${item.status == 'active' ? 'text-[#000]' : 'text-[#999] line-through'}`}>{item.name}</p>
                            </td>
                            <td className={`text-[17px] font-[600]  py-[10px] ${item.status == 'active' ? 'text-[#000]' : 'text-[#999]'}`}>{item.email}</td>
                            <td className={`text-[17px] font-[600] py-[10px] ${item.status == 'active' ? 'text-[#000]' : 'text-[#999]'} `}> {moment(item.last_login).fromNow()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Dashboard