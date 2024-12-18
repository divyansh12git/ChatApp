import { createSlice } from '@reduxjs/toolkit'

export const personalInformationSlice = createSlice({
    name: 'personalInformation',
    initialState: {
        id: "",
        name: "",
        username: "",
        friends: "",
        requested: "",
        profilePictureURL:"",
        Bio:"",
    },
    reducers: {
        updatePersonalInformation: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.friends = action.payload.friends;
            state.requested = action.payload.requested;
            state.profilePictureURL = action.payload.profilePictureURL;
            state.Bio = action.payload.Bio;
        }
    },
});

export const { updatePersonalInformation } = personalInformationSlice.actions
export default personalInformationSlice.reducer