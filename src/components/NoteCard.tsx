
import React from 'react';
import { Note } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface NoteCardProps {
  note: Note;
  isActive: boolean;
  onClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, isActive, onClick }) => {
  // Format the date as "X time ago"
  const timeAgo = formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true });
  
  // Truncate content for preview
  const contentPreview = note.content.substring(0, 120) + (note.content.length > 120 ? '...' : '');
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 border overflow-hidden",
        "hover:shadow-md hover:-translate-y-1",
        "active:shadow-sm active:translate-y-0",
        isActive ? "ring-2 ring-primary/40 shadow-md" : "shadow-sm"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <h3 className="font-medium text-lg line-clamp-1 mb-1">{note.title || "Untitled Note"}</h3>
        <p className="text-sm text-muted-foreground mb-2">{timeAgo}</p>
        <p className="text-sm text-foreground/80 line-clamp-3">{contentPreview || "No content"}</p>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
