import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    ApplicantsList: [],
    status: "idle",
    err: ""
}
export const fetchApplicants = createAsyncThunk("applicant slice", async () => {
    try {

        const data = await axios.get("http://localhost:9001/allApplicants").then(res => res.data)
        // console.log(data)
        return data.reverse()

    }
    catch (err) {
        console.log(err.message)
    }
})
const applicantSlice = createSlice({
    name: 'applicant slice',
    initialState,
    reducers: {
        sort: (state, action) => {
            switch (action.payload) {
                case "name": {
                    const nameData = state.ApplicantsList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                    state.ApplicantsList = nameData
                    break;
                }
                case "experience": {
                    const newData = state.ApplicantsList.sort((a, b) => (b.experience - a.experience))
                    state.ApplicantsList = newData
                    break;
                }
                default:{
                    return state                    
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApplicants.pending, (state, action) => {
            state.status = "loading"
        }).addCase(fetchApplicants.fulfilled, (state, action) => {
            state.status = "success"
            state.ApplicantsList = action.payload
        }).addCase(fetchApplicants.rejected, (state, action) => {
            state.status = "failed"
        })
    }
})
export default applicantSlice.reducer
export const { sort } = applicantSlice.actions