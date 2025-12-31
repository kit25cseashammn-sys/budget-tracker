import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  variant: 'balance' | 'income' | 'expense';
  className?: string;
}

export const StatCard = ({ title, amount, icon: Icon, variant, className }: StatCardProps) => {
  const variantStyles = {
    balance: 'gradient-primary shadow-glow',
    income: 'glass border-income/30',
    expense: 'glass border-expense/30',
  };

  const textStyles = {
    balance: 'text-primary-foreground',
    income: 'text-income',
    expense: 'text-expense',
  };

  const iconStyles = {
    balance: 'bg-primary-foreground/20 text-primary-foreground',
    income: 'bg-income/20 text-income',
    expense: 'bg-expense/20 text-expense',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] animate-slide-up',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn(
            'text-sm font-medium mb-1',
            variant === 'balance' ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}>
            {title}
          </p>
          <p className={cn('text-2xl md:text-3xl font-display font-bold', textStyles[variant])}>
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={cn('p-3 rounded-lg', iconStyles[variant])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
