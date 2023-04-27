import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchApplicants } from '../Redux/applicantSlice'
import ApplicantTablePage from './ApplicantComponents/ApplicantTablePage'
// import ApplicantsTable from './ApplicantComponents/ApplicantsTable'
const Homepage = () => {
  const dispatch=useDispatch()
  const status = useSelector(state => state.applicantList.status)
  const ApplicantData = useSelector(state => state.applicantList.ApplicantsList)
  useEffect(()=>{
    if(status==="idle"){
      dispatch(fetchApplicants())
    }
  },[dispatch,status,ApplicantData])
  return (
    <div>
        <div>
          <h4 className='text-center p-4'>Welcome to Applicant Tracking System</h4>
        </div>
      {ApplicantData.length > 0 ? <div className='container'>
        <ApplicantTablePage ApplicantData={ApplicantData} />
      </div> : null}
       
    </div>
  )
}
export default Homepage