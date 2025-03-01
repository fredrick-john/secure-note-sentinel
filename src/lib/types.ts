
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NotesContextType = {
  notes: Note[];
  activeNote: Note | null;
  setActiveNote: (note: Note | null) => void;
  createNote: () => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  deleteNote: (id: string) => void;
};
