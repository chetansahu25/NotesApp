import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router'
import { createNote, getNotes, updateNote, deleteNote } from '../api/notes.api'
import EditNoteModal from './EditNoteModal'



const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'active'
  });
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleCreateNoteForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await createNote(formData);
    console.log(response.data);
    document.getElementById('createNoteForm').reset();

    setTimeout(async () => {
      fetchNotes();
    }, 100);
  }


  const handleNotesClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setSelectedNote(null);
    setIsModalOpen(false);
  }

  const handleUpdateNote = async (updatedNoteData) => {
    try {
      await updateNote(selectedNote._id, updatedNoteData);
      const updatedNotes = await getNotes();
      setNotes(updatedNotes);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(noteId);
        const updatedNotes = await getNotes();
        setNotes(updatedNotes);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  }

  const fetchNotes = async () => {
    const response = await getNotes();
    setNotes(response);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">

        <div className="p-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">Dashboard</h1>

          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Create Note</h2>
            <form onSubmit={handleCreateNoteForm} id='createNoteForm' className="mt-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  placeholder="Enter your note title here"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  name="content"
                  id="content"
                  placeholder="Enter your note content here"
                  rows={5}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none sm:text-sm"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Create Note
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Recent Notes</h2>

            {
              notes?.length == 0 ?
                (<p className='flex w-full h-40 text-center items-center justify-center font-bold border-2 rounded-lg border-gray-300'>No notes found. Start creating some!</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {notes.map((note, index) => {
                      return (
                        <div
                          key={index}
                          id={note._id}
                          className='bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200'
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className='font-semibold text-xl text-gray-800'>{note.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${note.status === 'active' ? 'bg-green-100 text-green-800' :
                              note.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                              {note.status}
                            </span>
                          </div>
                          <p className='text-gray-600 mb-4 line-clamp-3'>{note.content}</p>
                          <div className="flex flex-col space-y-2 text-sm text-gray-500">
                            <p>Created by: {note.userId?.name || 'Unknown'}</p>
                            <p>Updated by: {note.updatedBy?.name || 'Not updated'}</p>
                            <p>Last updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex justify-end mt-4 space-x-2">
                            <button
                              onClick={() => handleNotesClick(note)}
                              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteNote(note._id);
                              }}
                              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
          </div>
        </div>
        {selectedNote && (
          <EditNoteModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            note={selectedNote}
            onSave={handleUpdateNote}
          />
        )}
      </div>
    </div>

  )
}

export default Dashboard