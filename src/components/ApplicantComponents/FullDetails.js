import React from 'react'
import FullDetailsForm from './FullDetailsForm'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const FullDetails = () => {
    const applicantdetails = useSelector(state => state.singleApplicant.ApplicantDetails)
    return (
        <div>
           {
                Object.keys(applicantdetails).length > 0 ? <FullDetailsForm applicantdetails={applicantdetails} /> : <Navigate replace to="/" />
           }
            
        </div>
    )
}

export default FullDetails