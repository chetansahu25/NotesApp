import axios from 'axios'


export const createNote = async (noteData) => {
    console.log(noteData)
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/notes/create`, noteData, { withCredentials: true })
        console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error('Failed to create note')
    }
}

export const getNotes = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes/`,{ withCredentials: true })    
        console.log(response.data)    
        return response.data
        
    } catch (error) {
        console.log(error)
        
    }
}

export const updateNote = async (noteId, noteData) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/notes/${noteId}`,
            noteData,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to update note');
    }
}

export const deleteNote = async (noteId) => {
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/notes/${noteId}`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete note');
    }
}


export const editNote = async (noteId, noteData) =>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/notes/${noteId}`, noteData,{ withCredentials: true }) 
        console.log(response.data)
        return response.data   
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }   
}