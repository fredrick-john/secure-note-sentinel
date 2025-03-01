
import React, { useEffect, useRef } from 'react';
import { useNotes } from '@/lib/notes-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NoteEditorProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ 
  onBack, 
  showBackButton = false 
}) => {
  const { activeNote, updateNote, deleteNote } = useNotes();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the title input when a new active note is set
    if (activeNote && titleRef.current) {
      titleRef.current.focus();
    }
  }, [activeNote?.id]);

  if (!activeNote) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
        <h2 className="text-2xl font-light text-muted-foreground mb-4">No Note Selected</h2>
        <p className="text-muted-foreground max-w-md">
          Select a note from the list or create a new note to get started.
        </p>
      </div>
    );
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNote(activeNote.id, { title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNote(activeNote.id, { content: e.target.value });
  };

  const handleDeleteNote = () => {
    deleteNote(activeNote.id);
    if (onBack) onBack();
  };

  const timeAgo = formatDistanceToNow(new Date(activeNote.updatedAt), { addSuffix: true });

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <div className="flex-1">
          <input
            ref={titleRef}
            type="text"
            value={activeNote.title}
            onChange={handleTitleChange}
            placeholder="Untitled Note"
            className="w-full bg-transparent border-none outline-none text-lg font-medium"
          />
          <p className="text-xs text-muted-foreground">Last updated {timeAgo}</p>
        </div>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
              <Trash2 className="h-5 w-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Note</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this note? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteNote} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <textarea
        value={activeNote.content}
        onChange={handleContentChange}
        placeholder="Start writing..."
        className="flex-1 p-4 w-full bg-transparent border-none resize-none outline-none"
      />
    </div>
  );
};

export default NoteEditor;
