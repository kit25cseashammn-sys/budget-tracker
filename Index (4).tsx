import { useTransactions } from '@/hooks/useTransactions';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { Analytics } from '@/components/Analytics';
import { Wallet, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

const Index = () => {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    balance,
    expensesByCategory,
    isLoaded,
  } = useTransactions();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 pb-12">
        {/* Stats Grid */}
        <section className="mb-8">
          <h2 className="sr-only">Financial Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Total Balance"
              amount={balance}
              icon={Wallet}
              variant="balance"
            />
            <StatCard
              title="Total Income"
              amount={totalIncome}
              icon={TrendingUp}
              variant="income"
            />
            <StatCard
              title="Total Expenses"
              amount={totalExpenses}
              icon={TrendingDown}
              variant="expense"
            />
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <TransactionForm onSubmit={addTransaction} />
            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction} 
            />
          </div>

          {/* Right Column - Analytics */}
          <div className="lg:col-span-1">
            <Analytics 
              transactions={transactions}
              expensesByCategory={expensesByCategory}
              totalExpenses={totalExpenses}
            />
          </div>
        </div>

        {/* Footer Note */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto">
            This prototype uses browser local storage to demonstrate core functionality.
            The system is designed to be easily upgraded to a full backend in the future.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
