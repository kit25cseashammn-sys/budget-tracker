import { Wallet } from 'lucide-react';

export const Header = () => {
  return (
    <header className="glass sticky top-0 z-50 border-b border-border/50">
      <div className="container py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Wallet className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              Finance Tracker
            </h1>
            <p className="text-xs text-muted-foreground">Track your expenses smartly</p>
          </div>
        </div>
      </div>
    </header>
  );
};
