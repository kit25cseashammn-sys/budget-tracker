import { Transaction } from '@/hooks/useTransactions';
import { formatCurrency, formatDate, categoryColors } from '@/lib/formatters';
import { Trash2, TrendingUp, TrendingDown, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
  const handleDelete = (id: string) => {
    onDelete(id);
    toast.success('Transaction deleted');
  };

  if (transactions.length === 0) {
    return (
      <div className="glass rounded-xl p-8 text-center animate-slide-up">
        <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No transactions yet</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-5 animate-slide-up">
      <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <Receipt className="w-5 h-5 text-primary" />
        Recent Transactions
      </h2>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {transactions.slice(0, 10).map((transaction, index) => (
          <div
            key={transaction.id}
            className={cn(
              'flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors animate-fade-in',
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  transaction.type === 'income' ? 'bg-income/20' : 'bg-expense/20'
                )}
              >
                {transaction.type === 'income' ? (
                  <TrendingUp className="w-5 h-5 text-income" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-expense" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">{transaction.category}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{formatDate(transaction.date)}</span>
                  {transaction.description && (
                    <>
                      <span>•</span>
                      <span className="truncate max-w-[150px]">{transaction.description}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'font-semibold font-display',
                  transaction.type === 'income' ? 'text-income' : 'text-expense'
                )}
              >
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
              <button
                onClick={() => handleDelete(transaction.id)}
                className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {transactions.length > 10 && (
        <p className="text-sm text-muted-foreground text-center mt-4">
          Showing 10 of {transactions.length} transactions
        </p>
      )}
    </div>
  );
};
