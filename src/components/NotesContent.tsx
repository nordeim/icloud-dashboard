// src/components/NotesContent.tsx
import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import NoteModal from './NoteModal';
import { noteService, Note } from '../services/noteService';
import { toast } from 'react-hot-toast';
import NoteItem from './NoteItem';

const NotesContent: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'edit' | 'delete' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedNotes = await noteService.getNotes();
      setNotes(fetchedNotes);
    } catch (err) {
      setError('Failed to fetch notes');
      toast.error('Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewNote = () => {
    setModalType('new');
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (content: string) => {
    try {
      if (modalType === 'new') {
        const newNote = await noteService.createNote(content);
        setNotes([newNote, ...notes]);
        toast.success('Note created successfully');
      } else if (modalType === 'edit' && selectedNote) {
        await noteService.updateNote(selectedNote.id, content);
        await fetchNotes(); // Refresh notes to get updated order
        toast.success('Note updated successfully');
      } else if (modalType === 'delete' && selectedNote) {
        await noteService.deleteNote(selectedNote.id);
        setNotes(notes.filter(note => note.id !== selectedNote.id));
        setSelectedNote(null);
        toast.success('Note deleted successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(`Failed to ${modalType} note`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-sm items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        <p className="mt-4 text-gray-500">Loading notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full bg-white rounded-lg shadow-sm items-center justify-center">
        <div className="text-red-500 mb-4">⚠️</div>
        <p className="text-gray-700">{error}</p>
        <button 
          onClick={fetchNotes}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">All iCloud</h2>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <FiPlus size={48} className="text-gray-400" />
            <p className="text-gray-500 text-center">Create your first note</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                isSelected={selectedNote?.id === note.id}
                onClick={() => setSelectedNote(note)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleNewNote}
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            <FiPlus className="mr-2" />
            New
          </button>
          <button
            onClick={() => {
              if (selectedNote) {
                setModalType('edit');
                setIsModalOpen(true);
              }
            }}
            className={`flex items-center px-4 py-2 text-white rounded-md transition-colors ${
              selectedNote
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedNote}
          >
            <FiEdit2 className="mr-2" />
            Edit
          </button>
          <button
            onClick={() => {
              if (selectedNote) {
                setModalType('delete');
                setIsModalOpen(true);
              }
            }}
            className={`flex items-center px-4 py-2 text-white rounded-md transition-colors ${
              selectedNote
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            disabled={!selectedNote}
          >
            <FiTrash2 className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Modal placeholder - will be implemented in next step */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <NoteModal
            type={modalType!}
            note={selectedNote}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default NotesContent;
