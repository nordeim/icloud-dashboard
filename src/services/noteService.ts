import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

const COLLECTION_NAME = 'notes';

export const noteService = {
  async getNotes(): Promise<Note[]> {
    try {
      const notesQuery = query(
        collection(db, COLLECTION_NAME), 
        orderBy('modifiedAt', 'desc')
      );
      const snapshot = await getDocs(notesQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Note));
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw new Error('Failed to fetch notes');
    }
  },

  async createNote(content: string): Promise<Note> {
    try {
      const timestamp = new Date().toISOString();
      const newNote = {
        content,
        createdAt: timestamp,
        modifiedAt: timestamp
      };
      const docRef = await addDoc(collection(db, COLLECTION_NAME), newNote);
      return {
        id: docRef.id,
        ...newNote
      };
    } catch (error) {
      console.error('Error creating note:', error);
      throw new Error('Failed to create note');
    }
  },

  async updateNote(id: string, content: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        content,
        modifiedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating note:', error);
      throw new Error('Failed to update note');
    }
  },

  async deleteNote(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw new Error('Failed to delete note');
    }
  }
}; 