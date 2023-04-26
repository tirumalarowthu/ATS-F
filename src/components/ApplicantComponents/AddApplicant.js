import React, { useState } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CButton, CForm, CFormInput, CFormSelect } from '@coreui/react'
import axios from 'axios'
import { toast } from 'react-toastify'
const AddApplicant = () => {  
  const [validated, setValidated] = useState(false)
  const [experience, setExperience] = useState(false)
  const [formData, setFormData] = useState({role:"Full Stack developer"})
  const handleSubmit = async (event) => { 
    const form = event.currentTarget
    event.preventDefault()
    setValidated(true)
    if (form.checkValidity() === true) {
      try {
        const fullname = document.getElementById('fname').value + " " + document.getElementById("lname").value
        const postedData = { ...formData, name: fullname }
        const config = {
          headers: {
            "Content-Type": "Application/json"
          }
        }
        const res = await axios.post("http://localhost:9001/applicant/add", postedData, config)
        if (res.status === 200) {
          toast.success(`Applicant created & Id is ${res.data._id}`)
          event.target.reset()
          window.location.reload(false)
          setValidated(false)
        }
      }
      catch (err) {
        alert(formData.email + " already exits try with another email")
        toast.warning(formData.email + " already exits ! Try with another email")
      }
    } else {
      alert("All feilds are required")
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <>
      <CCard className="mb-4 container">
        <CCardHeader className='text-center'>
          Add Applicant
          {/* <DocsLink href="https://coreui.io/docs/utilities/colors/" /> */}
        </CCardHeader>
        <CCardBody>
          <CRow>
            {/* <CNavLink to="/UpdateApplicant" component={NavLink}>
                            CLick here to go update status
                        </CNavLink>  */}
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={6}>
                <CFormInput
                  type="text"
                  placeholder="Enter First Name"
                  id="fname"
                  label="First name"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  placeholder="Enter Last name"
                  id="lname"
                  label="Last name"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="example@gmail.com "
                  id="validationCustom02"
                  label="Email"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="Number"
                  min="6000000000"
                  max="9999999999"
                  name="mobile"
                  onChange={handleInputChange}
                  feedbackInvalid="Please enter valid mobile number."
                  aria-describedby="validationCustom03Feedback"
                  placeholder="Enter mobile number"
                  id="validationCustom03"
                  label="Mobile Number"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormSelect
                  className='form-control'
                  aria-describedby="validationCustom04Feedback"
                  name="role"
                  onChange={handleInputChange}
                  feedbackInvalid="Please enter applied role."
                  id="validationCustom04"
                  label="Applied Role"
                  required
                ><option disabled>--Choose Applied Role--</option>
                  <option value="Full Stack Developer">Full Stack Java Developer</option>
                  <option value="Mern Stack Developer">Mern Stack Developer</option>
                  <option value="Software Tester">Software Tester</option>
                  <option value="React js Developer">React JS Developer</option>
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="collegeName"
                  onChange={handleInputChange}
                  placeholder="Enter college name"
                  id="validationCustom01"
                  label="College Name"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="qualification"
                  onChange={handleInputChange}
                  placeholder="Enter qualification"
                  id="validationCustom02"
                  label="Qualification"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="Number"
                  name="passout"
                  onChange={handleInputChange}
                  feedbackInvalid="Please enter a passout year."
                  min="2000"
                  max="2024"
                  aria-describedby="validationCustom05Feedback"
                  placeholder="Enter Passout Year"
                  id="validationCustom05"
                  label="Passout Year"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormSelect
                  className='form-control'
                  aria-describedby="validationCustom04Feedback"
                  id="validationCustom04"
                  label="Experience/Fresher"
                  onChange={(e) => e.target.value === "Experience" ? setExperience(true) : setExperience(false)}
                  required
                >
                  <option disabled>Choose...</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Experience"> Experience</option>
                </CFormSelect>
              </CCol>
              {
                experience ? <>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      name="previousCompany"
                      onChange={handleInputChange}
                      placeholder="Previous company name"
                      id="validationCustom01"
                      label="Previous Company Name"
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="Number"
                      name="experience"
                      onChange={handleInputChange}
                      min="1"
                      max="20"
                      placeholder="Enter experience"
                      id="validationCustom02"
                      label="Experience in Years"
                      required
                    />
                  </CCol>
                </> : null
              }

              <CCol md={6}>
                <CFormInput
                  type="text"
                  name="resumeLink"
                  onChange={handleInputChange}
                  placeholder="Provide resume link.."
                  id="validationCustom01"
                  label="Resume link"
                  required
                />
              </CCol>
              {/* <CCol md={6}>
                <CFormSelect
                  className='form-control'
                  aria-describedby="validationCustom04Feedback"
                  name="status"
                  onChange={handleInputChange}
                  id="validationCustom04"
                  label="Status"
                  required
                >
                  <option value="Assingment">Assignment</option>
                  <option value="Technical Round">Technical Round</option>
                  <option value="Manager Round">Manager Round</option>
                  <option value="HR Round">HR Round</option>
                </CFormSelect>
              </CCol> */}
              <CCol  className='text-center' ><br/>
                <CButton  color="primary" type="submit">
                  Add Applicant
                </CButton>
              </CCol>
            </CForm>
          </CRow>
        </CCardBody>
      </CCard>

    </>
  )
}

export default AddApplicant

