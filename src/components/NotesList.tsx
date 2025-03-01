
import React from 'react';
import { useNotes } from '@/lib/notes-context';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import NoteCard from './NoteCard';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface NotesListProps {
  onNoteSelect?: () => void;
  className?: string;
}

const NotesList: React.FC<NotesListProps> = ({ onNoteSelect, className }) => {
  const { notes, activeNote, setActiveNote, createNote } = useNotes();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredNotes = searchTerm 
    ? notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : notes;
    
  const handleNoteClick = (note: typeof notes[0]) => {
    setActiveNote(note);
    if (onNoteSelect) onNoteSelect();
  };
  
  const handleCreateNote = () => {
    createNote();
    if (onNoteSelect) onNoteSelect();
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-medium">Notes</h1>
        <Button onClick={handleCreateNote} size="icon" className="rounded-full" aria-label="Create new note">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search notes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            {searchTerm ? (
              <>
                <p className="text-muted-foreground mb-2">No notes found matching "{searchTerm}"</p>
                <Button variant="link" onClick={() => setSearchTerm('')}>
                  Clear search
                </Button>
              </>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">You don't have any notes yet</p>
                <Button onClick={handleCreateNote}>Create your first note</Button>
              </>
            )}
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                isActive={activeNote?.id === note.id}
                onClick={() => handleNoteClick(note)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesList;
