import { FaLock, FaLockOpen } from "react-icons/fa"
import { FaRegTrashCan } from "react-icons/fa6"
import FilterUsers from "./filter-users"
import SearchUsers from "./search-users"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import axios from "axios";

Header.propTypes  = {
  selectedUsers: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
}

function Header({selectedUsers, showModal, handleLogout}) {
    const API = import.meta.env.VITE_API_URL;

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    const queryClient = useQueryClient();

    // ==================== BLOCK USERS =====================
   const blockUsers = useMutation({
        mutationFn: async () => {
            if(selectedUsers.includes(user.id)) showModal('block')
            else {await axios.post(`${API}/api/users/update`, { ids: selectedUsers, action: 'block'}, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}
            })}
        },
        onSuccess: () => {queryClient.invalidateQueries(["users"])}
    });

    // ==================== UNBLOCK USERS =====================
   const unBlockUsers = useMutation({
        mutationFn: async () => {
            await axios.post(`${API}/api/users/update`, {ids: selectedUsers, action: 'unblock'}, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}
            });
        },
        onSuccess: () => {queryClient.invalidateQueries(["users"])}
    });

    // ==================== DELETE USERS =====================
   const deleteUsers = useMutation({
       mutationFn: async () => {
            if(selectedUsers.includes(user.id)) showModal('delete')
            else {await axios.post(`${API}/api/users/update`, { ids: selectedUsers,action: 'delete'}, {
                headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}
            })}
        },
        onSuccess: () => {queryClient.invalidateQueries(["users"])}
    });
  return (
    <div className="flex flex-col md:flex-row gap-[20px] justify-between items-center mb-[30px] p-[15px]">
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
            <button onClick={handleLogout} className="active:opacity-[80%] active:bg-[#ffffffd0] flex items-center gap-[10px] border-[2px] border-[#ba5364] text-[#ba5364] cursor-pointer rounded-[6px] px-[10px]"> 
                Logout
            </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-[10px]">
            <FilterUsers/>
            <SearchUsers/>
        </div>
    </div>
  )
}

export default Header