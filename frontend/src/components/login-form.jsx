import { Checkbox } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {email, password});
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard')
        } catch (err) {
            toast.error(err?.response?.data.message)
        }
    };
  return (
    <div className="w-full">
        <div className="max-w-[400px] mx-auto">
            <form onSubmit={handleSubmit}>
                <p className="text-[15px] text-[#888]">Start your journey</p>
                <h2 className="text-[30px] font-[600] text-[#222] mb-[60px] leading-[70%]">Sign In to The App</h2>
                <label htmlFor="email" className="border-[1px] flex items-center justify-between border-[#888] rounded-[5px] p-[7px] w-full mb-[30px]">
                    <div>
                        <span className="leading-[100%] block text-[14px] text-[#888]">E-mail</span>
                        <input required value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="w-[150%] text-[#222] outline-none" placeholder="test@example.com"/>
                    </div>
                    <div className="cursor-pointer mr-[10px]" type="button">
                        <MdOutlineMailOutline className="text-[#888] text-[20px]" />
                    </div>
                </label>
                <label htmlFor="password" className="border-[1px] border-[#888] rounded-[5px] p-[7px] w-full flex items-center justify-between  mb-[20px]">
                    <div>
                        <span className="leading-[100%] block text-[14px] text-[#888]">Password</span>
                        <input required value={password} onChange={(e) => setPassword(e.target.value)}  id="password" type="password" className="w-[150%] text-[#222] outline-none" placeholder="password"/>
                    </div>
                    <div className="cursor-pointer mr-[10px]" type="button">
                        <FaRegEye className="text-[#888] text-[20px]" />
                    </div>
                </label>
                <label htmlFor="remember" className="cursor-pointer flex gap-[7px] items-center mb-[10px]">
                    <Checkbox id="remember"></Checkbox>
                    <span className="text-[18px]">Remember me</span>
                </label>
                <button type="submit" className="w-full p-[10px] bg-[#116dfd] text-[#fff] rounded-[7px] cursor-pointer">Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default LoginForm