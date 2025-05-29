import { Checkbox } from 'antd';
import {useNavigate, useSearchParams} from 'react-router-dom'
import axios from "axios";
import { useState } from "react";
import moment from 'moment';
import { useQuery } from "@tanstack/react-query";
import ModalCompopnent from "./modal";
import Header from "./header";

function Dashboard() {
    const [selectAll, setSelectAll] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [methodMyself, setMethodMyself] = useState('block')

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const search = searchParams.get('search') || ""
    const filter = searchParams.get('filter') || ""
    
    // Modal to block or delete myself
    const showModal = (method) => {
        setIsModalOpen(true);
        setMethodMyself(method)
    };

    // select all users
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked
        setSelectAll(isChecked)
        if (isChecked) {
            const allUserIds = users.map(user => user.id)
            setSelectedUsers(allUserIds)
        } else  setSelectedUsers([])
    }

    // Selected users
    const handleSelectUser = (userId, isChecked) => {
        if (isChecked) setSelectedUsers([...selectedUsers, userId])
        else  setSelectedUsers(selectedUsers.filter(id => id !== userId)) 
    }

    // logout
    function handleLogout()  {
        localStorage.clear()
        navigate('/')
    }
    
    //===================== get All users =========================
    async function getUsers() {
        try {
            const res = await axios.get('http://localhost:5000/api/users', { headers: {'Content-Type': 'application/json',Authorization: `Bearer ${token}`},})
            const allProducts =  res.data;
            const searchEd = allProducts.filter((user) =>  user.name.toLowerCase().includes(search.toLowerCase()) );
            if(filter == 'name') return searchEd.sort((a, b) => a.name.localeCompare(b.name))
            else if (filter == 'email')  return searchEd.sort((a, b) => a.email.localeCompare(b.email))
            else  return searchEd
        } 
        catch(err) {console.log(err)}
    }
    const { data: users } = useQuery({
      queryKey: ["users", search, filter],
      queryFn: getUsers,
    });

  return (
    <div className="p-[30px] md:p-[50px]">
        <Header handleLogout={handleLogout} showModal={showModal} selectedUsers={selectedUsers}/>
        <div className='overflow-x-auto min-h-[62vh]'>
            <table className="w-full">
                <thead>
                    <tr className="border-b-[1px] border-[#c1c1c1] ">
                        <td className="w-[50px] min-w-[49px] text-center ">
                            <Checkbox  onChange={handleSelectAll} checked={selectAll} value={true}></Checkbox>
                        </td>
                        <td className="text-[15px] md:text-[20px] font-[700] min-w-[130px] py-[10px]">Name</td>
                        <td className="flex gap-[7px] items-center min-w-[250px]  py-[10px]">
                            <span className="text-[15px] md:text-[20px] font-[700]">Email</span>
                        </td>
                        <td className="text-[15px] md:text-[20px] font-[700] min-w-[150px] py-[10px]">Last seen</td>
                    </tr>
                </thead>
                <tbody>
                    {users && users?.map((item) => (
                        <tr key={item.id} className="border-b-[1px] border-[#c1c1c1] ">
                            <td className="w-[50px] text-center ">
                                <Checkbox onChange={(e) => handleSelectUser(item.id, e.target.checked)} checked={selectedUsers.includes(item.id)}></Checkbox>
                            </td>
                            <td className="py-[10px] ">
                                <p className={`text-[15px] md:text-[20px] font-[400] md:font-[500] ${item.status == 'active' ? 'text-[#000]' : 'text-[#999] line-through'}`}>{item.name}</p>
                            </td>
                            <td className={`text-[15px] md:text-[17px] font-[400] md:font-[600]  py-[10px] ${item.status == 'active' ? 'text-[#000]' : 'text-[#999]'}`}>{item.email}</td>
                            <td className={`text-[15px] md:text-[17px] font-[400] md:font-[600] py-[10px] ${item.status == 'active' ? 'text-[#000]' : 'text-[#999]'} `}> {moment(item.last_login).fromNow()}</td>
                        </tr>
                    ))}
                    {!users?.length && (
                        <tr>
                            <td colSpan={4} className="text-center">
                                <img src="/no_data.svg" alt="not found" className="mx-auto max-w-[310px] mt-[20px]"/>
                                <h2 className="mt-[20px] text-[17px] font-[600]">No users</h2>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <ModalCompopnent isModalOpen={isModalOpen} handleLogout={handleLogout} selectedUsers={selectedUsers} setIsModalOpen={setIsModalOpen} methodMyself={methodMyself}/>
    </div>
  )
}

export default Dashboard