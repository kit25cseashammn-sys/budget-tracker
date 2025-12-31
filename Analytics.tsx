import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency, categoryColors } from '@/lib/formatters';
import { Transaction } from '@/hooks/useTransactions';
import { BarChart3, TrendingDown } from 'lucide-react';

interface AnalyticsProps {
  transactions: Transaction[];
  expensesByCategory: Record<string, number>;
  totalExpenses: number;
}

export const Analytics = ({ transactions, expensesByCategory, totalExpenses }: AnalyticsProps) => {
  const chartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
    color: categoryColors[name] || '#6b7280',
  }));

  // Get current month name
  const currentMonth = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  // Calculate monthly expenses
  const now = new Date();
  const currentMonthExpenses = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' && 
             date.getMonth() === now.getMonth() && 
             date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-xl p-8 text-center animate-slide-up">
        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No expense data to analyze</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Add some expenses to see analytics</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 animate-slide-up">
      <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        Expense Analytics
      </h2>

      {/* Monthly Summary Card */}
      <div className="bg-secondary/50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-4 h-4 text-expense" />
          <span className="text-sm text-muted-foreground">{currentMonth}</span>
        </div>
        <p className="text-2xl font-display font-bold text-expense">
          {formatCurrency(currentMonthExpenses)}
        </p>
        <p className="text-sm text-muted-foreground mt-1">spent this month</p>
      </div>

      {/* Pie Chart */}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'hsl(222 47% 9%)',
                border: '1px solid hsl(222 30% 18%)',
                borderRadius: '8px',
                color: 'hsl(210 40% 98%)',
              }}
            />
            <Legend
              formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Category Breakdown</h3>
        {chartData.map(({ name, value, color }) => (
          <div key={name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm text-foreground">{name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-foreground">{formatCurrency(value)}</span>
              <span className="text-xs text-muted-foreground ml-2">
                ({((value / totalExpenses) * 100).toFixed(0)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
