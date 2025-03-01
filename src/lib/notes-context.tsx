
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Note, NotesContextType } from './types';
import { toast } from '@/components/ui/use-toast';

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your notes',
        variant: 'destructive',
      });
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Failed to save notes:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your changes',
        variant: 'destructive',
      });
    }
  }, [notes]);

  // Create a new note
  const createNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNote(newNote);
    
    toast({
      title: 'Note created',
      description: 'New note has been created',
    });
    
    return newNote;
  };

  // Update an existing note
  const updateNote = (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
    setNotes((prevNotes) => 
      prevNotes.map((note) => 
        note.id === id 
          ? { 
              ...note, 
              ...updates, 
              updatedAt: new Date() 
            } 
          : note
      )
    );
    
    // Also update activeNote if it's the one being modified
    if (activeNote && activeNote.id === id) {
      setActiveNote((prev) => 
        prev ? { ...prev, ...updates, updatedAt: new Date() } : prev
      );
    }
  };

  // Delete a note
  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    
    // Clear activeNote if it's the one being deleted
    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
    }
    
    toast({
      title: 'Note deleted',
      description: 'Your note has been deleted',
    });
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        activeNote,
        setActiveNote,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
