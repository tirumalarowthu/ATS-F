import React from 'react'
import "./HeaderStyles.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Header = () => {
    const navigate=useNavigate()
    const logout = () => {
        localStorage.removeItem("AdminInfo")
        toast.warning("Account Logout Successfully")
        navigate("/")
        window.location.reload(false)
    }
    
   
    return (
        <div id="header" className='header'>
            <ul className='header_ul'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/addApplicant">Add Applicant</Link></li>
                <li><Link to="/update/one">Update Applicant Status</Link></li>
                <li onClick={() => logout()}>Logout</li>
            </ul>
        </div>
    )
}


export default Header