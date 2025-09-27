import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { getDeletedNotes, editNote, deleteNote, permanentlyDeleteNote } from '../api/notes.api'

const DeletedNotes = () => {
  const [deletedNotes, setDeletedNotes] = useState([])
  const { user } = useAuth()

  const handlePermanentDeleteNote = async (noteId) => {
    try {
      await permanentlyDeleteNote(noteId);
      alert('Note permanently deleted');
      await fetchDeletedNotes()
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  const handleRestore = async (note) =>{
    console.log(note)
    const response = await editNote(note._id, {...note, status:'active' });
    await fetchDeletedNotes()
  }

  const fetchDeletedNotes = async () => {
    try {
      const response = await getDeletedNotes()
      // Filter only deleted notes
      setDeletedNotes(response)
    } catch (error) {
      console.error('Error fetching deleted notes:', error)
    }
  }

  useEffect(() => {
    fetchDeletedNotes()
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-8">Deleted Notes</h1>
          
          {deletedNotes?.length === 0 ? (
            <div className="text-center py-12 px-4 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 text-lg">No deleted notes found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {deletedNotes.map((note, index) => (
                <div 
                  key={index}
                  id={note._id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{note.title}</h3>
                      <span className="ml-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        Deleted
                      </span>
                    </div>

                    <p className="text-gray-600 line-clamp-3 mb-4 text-sm">{note.content}</p>

                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">Created by:</span>
                        <span className="ml-1">{note.userId?.name || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">Updated by:</span>
                        <span className="ml-1">{note.updatedBy?.name || 'Not updated'}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="font-medium">Last updated:</span>
                        <span className="ml-1">{new Date(note.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={()=>handleRestore(note)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 transition-colors duration-200"
                      >
                        Restore
                      </button>
                      <button 
                        onClick={() => {
                          handlePermanentDeleteNote(note._id);
                        }}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors duration-200"
                      >
                        Delete Permanently
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DeletedNotes