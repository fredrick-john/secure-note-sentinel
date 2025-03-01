
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { NotesProvider } from '@/lib/notes-context';
import NotesList from '@/components/NotesList';
import NoteEditor from '@/components/NoteEditor';
import AuthDialog from '@/components/AuthDialog';
import { Button } from '@/components/ui/button';
import { Menu, Info, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(true);
  const { theme, setTheme } = useTheme();
  
  // State for mobile view management
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showMobileEditor, setShowMobileEditor] = useState(false);
  
  useEffect(() => {
    // If the user is not on mobile, always show both panels
    if (!isMobile) {
      setShowMobileEditor(false);
    }
  }, [isMobile]);
  
  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    setShowAuthDialog(false);
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-4xl font-bold mb-6">SecureNotes</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your secure, private notes application.
          </p>
          <AuthDialog 
            open={showAuthDialog} 
            onAuthenticate={handleAuthenticate} 
          />
        </div>
      </div>
    );
  }

  return (
    <NotesProvider>
      <div className="flex flex-col min-h-screen">
        <header className="border-b bg-background/90 backdrop-blur-md sticky top-0 z-10">
          <div className="container flex items-center justify-between h-14 px-4">
            <div className="flex items-center gap-2">
              {isMobile && showMobileEditor && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowMobileEditor(false)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <h1 className="text-lg font-medium">SecureNotes</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 flex overflow-hidden">
          {(!isMobile || !showMobileEditor) && (
            <div className={`${isMobile ? 'w-full' : 'w-1/3 border-r'} bg-background animate-slide-up`}>
              <NotesList 
                onNoteSelect={() => isMobile && setShowMobileEditor(true)} 
              />
            </div>
          )}
          
          {(!isMobile || showMobileEditor) && (
            <div className={`${isMobile ? 'w-full' : 'w-2/3'} bg-background animate-slide-up`}>
              <NoteEditor 
                showBackButton={isMobile} 
                onBack={() => setShowMobileEditor(false)} 
              />
            </div>
          )}
        </main>
      </div>
    </NotesProvider>
  );
};

export default Index;
