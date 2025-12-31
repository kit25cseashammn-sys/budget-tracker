import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories, getTodayDate } from '@/lib/formatters';
import { Transaction } from '@/hooks/useTransactions';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

export const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (!category) {
      toast.error('Please select a category');
      return;
    }

    onSubmit({
      type,
      amount: parseFloat(amount),
      category,
      date,
      description: description.trim() || undefined,
    });

    // Reset form
    setAmount('');
    setCategory('');
    setDate(getTodayDate());
    setDescription('');
    
    toast.success(`${type === 'income' ? 'Income' : 'Expense'} added successfully!`);
  };

  return (
    <div className="glass rounded-xl p-6 animate-slide-up">
      <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Add Transaction
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Type Toggle */}
        <div className="flex gap-2 p-1 bg-secondary rounded-lg">
          <button
            type="button"
            onClick={() => setType('income')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-medium transition-all duration-200',
              type === 'income'
                ? 'gradient-income text-income-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Income
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-medium transition-all duration-200',
              type === 'expense'
                ? 'gradient-expense text-expense-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <TrendingDown className="w-4 h-4" />
            Expense
          </button>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="1"
            className="bg-secondary border-border focus:border-primary"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-secondary border-border focus:border-primary"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            type="text"
            placeholder="E.g., Lunch at college canteen"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={100}
            className="bg-secondary border-border focus:border-primary"
          />
        </div>

        <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold py-5 hover:opacity-90 transition-opacity">
          Add Transaction
        </Button>
      </form>
    </div>
  );
};
