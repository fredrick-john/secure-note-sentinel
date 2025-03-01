
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Fingerprint, LockKeyhole } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AuthDialogProps {
  open: boolean;
  onAuthenticate: () => void;
}

// This is a simulated authentication dialog
// In a real application, this would use the Biometric API
const AuthDialog: React.FC<AuthDialogProps> = ({ open, onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') { // Simple demo password
      onAuthenticate();
      toast({
        title: "Authenticated",
        description: "You are now authenticated",
      });
    } else {
      setError(true);
      toast({
        title: "Authentication failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };
  
  const simulateBiometric = () => {
    // Simulate successful biometric authentication
    setTimeout(() => {
      onAuthenticate();
      toast({
        title: "Authenticated",
        description: "Biometric authentication successful",
      });
    }, 1000);
  };
  
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Authentication Required</DialogTitle>
          <DialogDescription className="text-center">
            Please authenticate to access your secure notes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          <Button 
            onClick={simulateBiometric} 
            className="w-full flex items-center justify-center gap-2"
          >
            <Fingerprint className="h-5 w-5" />
            Use Biometric Authentication
          </Button>
          
          <div className="relative w-full flex items-center">
            <div className="flex-grow border-t border-muted"></div>
            <span className="mx-2 text-xs text-muted-foreground">OR</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3 w-full">
            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Enter password (use '1234' for demo)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={error ? "border-destructive" : ""}
              />
              {error && (
                <p className="text-destructive text-xs">Incorrect password</p>
              )}
            </div>
            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <LockKeyhole className="h-4 w-4" />
              Unlock
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
