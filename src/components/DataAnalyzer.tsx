import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Divide, Maximize, Minus, Percent, Plus, Sigma, TrendingUp } from 'lucide-react';

// --- Sample Datasets ---
const temperatures = [72, 75, 68, 80, 77, 74, 69, 78, 76, 73, 'N/A', 70]; // Includes non-numeric value for testing
const testScores = [88, 92, 79, 95, 87, 90, 84, 89, 93, 86];
const salesFigures = [1200, 1450, 980, 1680, 1250, 1520, 1100, 1400];

// Define the structure for storing results
interface AnalysisResults {
  count: number;
  sum: number;
  average: number;
  minimum: number;
  maximum: number;
  median: number;
  range: number;
  standardDeviation: number;
  aboveAverageCount: number;
  belowAverageCount: number;
}

// Initial empty results state
const initialResults: AnalysisResults = {
  count: 0, sum: 0, average: 0, minimum: 0, maximum: 0,
  median: 0, range: 0, standardDeviation: 0,
  aboveAverageCount: 0, belowAverageCount: 0,
};

// --- Core Calculation Functions ---

// Filters out non-numeric values and converts to number
const cleanData = (data: (number | string)[]): number[] => {
  return data.map(val => (typeof val === 'string' ? parseFloat(val) : val))
             .filter(val => typeof val === 'number' && !isNaN(val));
};

const calculateMedian = (data: number[]): number => {
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  if (sorted.length === 0) return 0;
  
  // If count is even, average the two middle numbers
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  // If count is odd, return the middle number
  return sorted[mid];
};

const calculateStandardDeviation = (data: number[], average: number): number => {
  if (data.length < 2) return 0;
  
  const squaredDifferences = data.map(n => Math.pow(n - average, 2));
  const variance = squaredDifferences.reduce((sum, val) => sum + val, 0) / (data.length - 1); // Sample standard deviation
  
  return Math.sqrt(variance);
};


const DataAnalyzer = () => {
  // State to hold the selected raw dataset
  const [currentDataset, setCurrentDataset] = useState<(number | string)[]>(temperatures);
  // State to hold the final calculated results
  const [results, setResults] = useState<AnalysisResults | null>(null);
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // --- Main Analysis Logic ---
  const analyzeData = () => {
    setError(null);
    setResults(null);

    // 1. Error Handling: Filter out non-numeric values
    const cleaned = cleanData(currentDataset);
    
    // 2. Error Handling: Show error if no valid numbers are found or array is empty
    if (cleaned.length === 0) {
      setError("No valid numeric data found in the selected dataset. Please check the data source.");
      return;
    }
    
    // --- Calculations ---
    const count = cleaned.length;
    const sum = cleaned.reduce((acc, val) => acc + val, 0);
    const average = sum / count;
    const minimum = Math.min(...cleaned);
    const maximum = Math.max(...cleaned);
    const median = calculateMedian(cleaned);
    const range = maximum - minimum;

    // --- Bonus Challenges ---
    const stdDev = calculateStandardDeviation(cleaned, average);
    
    // Find numbers above/below average
    const aboveAverageCount = cleaned.filter(n => n > average).length;
    const belowAverageCount = cleaned.filter(n => n < average).length;

    // Store results
    setResults({
      count, sum, average: parseFloat(average.toFixed(2)), minimum, maximum, median, range,
      standardDeviation: parseFloat(stdDev.toFixed(2)),
      aboveAverageCount,
      belowAverageCount,
    });
  };

  // --- JSX Rendering ---
  return (
    <Card className="max-w-3xl mx-auto shadow-xl bg-blue-50 border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Sigma className="h-6 w-6 text-blue-600" /> Data Analyzer
        </CardTitle>
        <p className="text-sm text-gray-500">Analyze key statistics from a sample dataset.</p>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* User Interaction: Dataset Selector (Bonus Challenge) */}
        <div className="flex flex-col sm:flex-row gap-3">
            <select
                className="flex-grow border p-2 rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => {
                    setResults(null); // Reset results when data changes
                    setError(null);
                    switch (e.target.value) {
                        case 'scores': setCurrentDataset(testScores); break;
                        case 'sales': setCurrentDataset(salesFigures); break;
                        default: setCurrentDataset(temperatures);
                    }
                }}
                defaultValue="temps"
            >
                <option value="temps">Temperatures</option>
                <option value="scores">Test Scores</option>
                <option value="sales">Sales Figures</option>
            </select>
            
            {/* User Interaction: Analysis Button */}
            <Button 
                onClick={analyzeData}
                className="bg-blue-600 hover:bg-blue-700"
            >
                <TrendingUp className="h-4 w-4 mr-2" /> 
                Trigger Analysis
            </Button>
        </div>
        
        {/* Error Display */}
        {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {/* Results Display */}
        {results && (
            <>
                <h3 className="text-xl font-semibold border-b pb-2 text-gray-700">Analysis Results</h3>
                <Table className="border rounded-lg">
                    <TableBody>
                        {/* Core Requirements */}
                        <AnalysisRow icon={<Plus className="h-4 w-4 text-green-500" />} label="Count" value={results.count} />
                        <AnalysisRow icon={<Sigma className="h-4 w-4 text-indigo-500" />} label="Sum" value={results.sum} />
                        <AnalysisRow icon={<Divide className="h-4 w-4 text-blue-500" />} label="Average" value={results.average} />
                        <AnalysisRow icon={<Minus className="h-4 w-4 text-red-500" />} label="Minimum" value={results.minimum} />
                        <AnalysisRow icon={<Maximize className="h-4 w-4 text-red-500" />} label="Maximum" value={results.maximum} />
                        <AnalysisRow icon={<Percent className="h-4 w-4 text-purple-500" />} label="Median" value={results.median} />
                        <AnalysisRow icon={<TrendingUp className="h-4 w-4 text-orange-500" />} label="Range" value={results.range} />

                        {/* Bonus Challenges */}
                        <AnalysisRow icon={<AlertCircle className="h-4 w-4 text-yellow-500" />} label="Standard Deviation" value={results.standardDeviation} />
                        <AnalysisRow label="Above Average Count" value={results.aboveAverageCount} />
                        <AnalysisRow label="Below Average Count" value={results.belowAverageCount} />
                    </TableBody>
                </Table>
                
                <p className="text-sm text-gray-500 mt-4">
                    Data analyzed: [{cleanData(currentDataset).join(', ')}]
                </p>
            </>
        )}
      </CardContent>
    </Card>
  );
};

// Helper Component for clean result display
interface AnalysisRowProps {
    label: string;
    value: number | string;
    icon?: React.ReactNode;
}
const AnalysisRow: React.FC<AnalysisRowProps> = ({ label, value, icon }) => (
    <TableRow>
        <TableCell className="font-medium flex items-center gap-2">
            {icon}
            {label}
        </TableCell>
        <TableCell className="text-right font-semibold">{value}</TableCell>
    </TableRow>
);


export default DataAnalyzer;