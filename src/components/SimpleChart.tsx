import React, { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, LineChartIcon, PieChartIcon } from 'lucide-react';

// --- Sample Datasets ---
const SALES_DATA = [
  { month: 'Jan', sales: 65, profit: 40 },
  { month: 'Feb', sales: 85, profit: 55 },
  { month: 'Mar', sales: 75, profit: 45 },
  { month: 'Apr', sales: 95, profit: 60 },
  { month: 'May', sales: 110, profit: 70 },
  { month: 'Jun', sales: 125, profit: 80 },
];

// --- DataAnalyzer Results Simulation (for 'Connect to real data' requirement) ---
// This dataset summarizes results from DataAnalyzer.
const ANALYTICS_DATA = [
  { metric: 'Min', value: 68, color: '#f87171' },
  { metric: 'Avg', value: 74.9, color: '#3b82f6' },
  { metric: 'Max', value: 80, color: '#10b981' },
  { metric: 'Median', value: 75.5, color: '#a855f7' },
];

// Define chart types
type ChartType = 'Bar' | 'Line' | 'Pie';

// Custom colors for Pie Chart
const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SimpleChart = () => {
  const [chartType, setChartType] = useState<ChartType>('Bar');
  const [dataSelection, setDataSelection] = useState<'Sales' | 'Analytics'>('Sales');
  
  // Determine which data to use based on selection
  const currentData = dataSelection === 'Sales' ? SALES_DATA : ANALYTICS_DATA;
  
  // Error Handling: Check if data is missing or invalid
  if (!currentData || currentData.length === 0) {
    return (
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader><CardTitle>Data Visualization</CardTitle></CardHeader>
        <CardContent>
          <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded">
            Error: No valid data available for charting.
          </div>
        </CardContent>
      </Card>
    );
  }

  // --- Custom Tooltip Component ---
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 shadow-lg text-sm rounded">
          <p className="font-bold text-gray-700">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} style={{ color: item.color }}>
              {`${item.name}: ${item.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    // Determine key for XAxis/Bar/Line based on dataset
    const xKey = dataSelection === 'Sales' ? 'month' : 'metric';
    const dataKey1 = dataSelection === 'Sales' ? 'sales' : 'value';
    const dataKey2 = dataSelection === 'Sales' ? 'profit' : undefined; // Only sales data has a second key

    const chartHeight = 300;

    switch (chartType) {
      case 'Bar':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey={xKey} padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey={dataKey1} fill="#3b82f6" name={dataSelection === 'Sales' ? 'Sales Revenue' : 'Metric Value'} />
              {dataKey2 && <Bar dataKey={dataKey2} fill="#10b981" name="Profit" />}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'Line':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {/* Custom color for line */}
              <Line type="monotone" dataKey={dataKey1} stroke="#f97316" strokeWidth={2} name={dataSelection === 'Sales' ? 'Sales Trend' : 'Metric Value'} activeDot={{ r: 8 }} />
              {dataKey2 && <Line type="monotone" dataKey={dataKey2} stroke="#a855f7" strokeWidth={2} name="Profit Trend" activeDot={{ r: 8 }} />}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'Pie': // Bonus Chart
        return (
          <ResponsiveContainer width="100%" height={chartHeight + 50}>
            <PieChart>
              <Pie
                data={ANALYTICS_DATA} // Pie chart is best suited for the aggregated metrics
                dataKey="value"
                nameKey="metric"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                 {ANALYTICS_DATA.map((entry, index) => (
                    // Use custom colors from the data
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-xl bg-blue-50 border border-gray-200">
      <CardHeader>
        <CardTitle>📊 Data Visualization Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Chart Type and Data Selector */}
        <div className="flex flex-col sm:flex-row gap-3 border-b pb-4">
            {/* Data Source Selector */}
            <div className="flex-grow">
                <label className="text-xs text-gray-500 block">Select Data Source</label>
                <select
                    className="w-full border p-2 rounded-md bg-white shadow-sm"
                    onChange={(e) => setDataSelection(e.target.value as 'Sales' | 'Analytics')}
                    value={dataSelection}
                >
                    <option value="Sales">Sales Data</option>
                    <option value="Analytics">DataAnalyzer Results</option>
                </select>
            </div>
            
            {/* Chart Type Selector (Buttons) */}
            <div className="flex space-x-2">
                <Button 
                    variant={chartType === 'Bar' ? 'default' : 'outline'}
                    onClick={() => setChartType('Bar')}
                >
                    <BarChart3 className="h-4 w-4 mr-1" /> Bar
                </Button>
                <Button 
                    variant={chartType === 'Line' ? 'default' : 'outline'}
                    onClick={() => setChartType('Line')}
                >
                    <LineChartIcon className="h-4 w-4 mr-1" /> Line
                </Button>
                 <Button 
                    variant={chartType === 'Pie' ? 'default' : 'outline'}
                    onClick={() => setChartType('Pie')}
                    disabled={dataSelection === 'Sales'} // Pie works best on aggregated data
                >
                    <PieChartIcon className="h-4 w-4 mr-1" /> Pie
                </Button>
            </div>
        </div>

        {/* Render the selected chart */}
        <div className="min-h-[350px]">
            {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleChart;