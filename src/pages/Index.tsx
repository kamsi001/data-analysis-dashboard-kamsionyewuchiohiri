
// ==========================================
// 🏠 WEEK 1: Index.tsx - Homepage Component
// ==========================================
// This is your main homepage! You will customize this in Week 1
// and add interactive components starting in Week 2.

// 📦 React imports - the core tools for building components
import { useState } from 'react';

// 🎨 Icon imports - beautiful icons for your UI
import { Upload, FileText, BarChart3, Brain, Zap, PieChart, TrendingUp, Database } from 'lucide-react';

// 🧩 UI Component imports - pre-built components for your interface
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 📊 Data-related imports - components that handle your data
import DataUpload from '@/components/DataUpload';
import Dashboard from '@/components/Dashboard';
import { DataRow } from '@/types/data';
// 🆕 WEEK 3: Import NameInput demo
// import NameInput from '@/components/NameInput';

import UploadProgressSimulator from '@/components/UploadProgressSimulator';
import InteractivePractice from '@/components/homework/InteractivePractice';

// 🔧 WEEK 3+: Additional imports will be added as you progress

const Index = () => {
  // 🧠 Component State - this is your component's memory!
  // useState lets your component remember and change data
  const [data, setData] = useState<DataRow[]>([]);      // Stores uploaded data
  const [fileName, setFileName] = useState<string>(''); // Remembers file name

  // 🔄 Event Handler - function that runs when data is uploaded
  const handleDataLoad = (loadedData: DataRow[], name: string) => {
    setData(loadedData);
    setFileName(name);
    console.log('Data loaded:', loadedData.length, 'rows');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 🎨 Hero Section - The top part of your homepage */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          {/* 🎯 Logo and Title */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Database className="h-12 w-12 text-white" />
            </div>
          </div>
          
          {/* 📝 WEEK 1: Students customize this title with their name */}
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Kamsi's Data Hub
          </h1>
          <p className="text-xl text-slate-600 mb-2">Data Insight Engine</p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Upload your dataset and instantly discover insights, visualize trends, and explore your data with interactive charts and analytics.
          </p>
<<<<<<< HEAD
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Built by Kamsi Onyewuchi-Ohiri - Future Software Engineer
          </p>
=======
          {/* 🆕 WEEK 3: Live Event Handling Demo (removed NameInput from homepage) */}
          {/* <div className="mt-8 mb-8 flex justify-center">
            <NameInput />
          </div> */}
>>>>>>> upstream/main
        </div>

        {/* 🔧 WEEK 2: ADD YOUR PROGRESS COMPONENT HERE! */}
        {/* This is where students will add their UploadProgressSimulator component */}
        {/* Example: */}
        {/* <div className="mb-8">
          <UploadProgressSimulator />
        </div> */}
        <div className="mb-12 max-w-2xl mx-auto">
          <InteractivePractice /> {/* <--- ADD THIS BLOCK */}
        </div>

        {data.length === 0 ? (
          <>
            {/* 🎨 Features Grid - Shows what your app can do */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* 📤 Upload Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Easy Data Upload</CardTitle>
                  <CardDescription>
                    Simply drag and drop your CSV files or click to browse. Support for various data formats.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 📊 Charts Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">Interactive Charts</CardTitle>
                  <CardDescription>
                    Automatically generate bar charts, line graphs, pie charts, and more from your data.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 🧠 Insights Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">Smart Insights</CardTitle>
                  <CardDescription>
                    Discover patterns, trends, and statistical insights automatically generated from your dataset.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* 📤 Upload Section - Where users upload their data */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Get Started</CardTitle>
                <CardDescription>
                  Upload your CSV file to begin exploring your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataUpload onDataLoad={handleDataLoad} />
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-3 h-6 w-6 text-purple-600" />
                  Interactive Progress Demo
                </CardTitle>
                <CardDescription>
                  Try our upload progress simulator built with React state!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UploadProgressSimulator />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Dashboard data={data} fileName={fileName} onReset={() => {
              setData([]);
              setFileName('');
            }} />
          </>
        )}
      </div>

      {/* 👣 Footer Component - Added to the bottom of the page */}
      <footer className="w-full mt-12 py-6 border-t border-slate-200 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center md:flex md:justify-between md:items-center text-sm text-slate-600">
          {/* Copyright and Build Info */}
          <div className="mb-4 md:mb-0">
            <p className="font-semibold">
              &copy; {new Date().getFullYear()} Kamsi Onyewuchi-Ohiri. All rights reserved.
            </p>
            <p className="text-xs mt-1 flex items-center justify-center md:justify-start">
              Built with <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" className="h-4 w-4 mx-1" /> React
            </p>
          </div>

          {/* Social Links (Placeholder) */}
          <div className="flex justify-center md:justify-end space-x-4">
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <svg xmlns="https://www.linkedin.com/in/doreenonyewuchiohiri" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin h-5 w-5 hover:text-blue-700 transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </Button>
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <svg xmlns="https://github.com/kamsi001" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-5 w-5 hover:text-gray-900 transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.5 0 7.3-1.6 7.3-8.3 0-1.7-.6-3.1-1.6-4.2.7-1.6.7-3.6 0-5.2s-2.9-1.3-4.2 0a12.8 12.8 0 0 0-5.2 0c-1.3 1.3-4.2 1.3-5.2 0s-.7 3.6 0 5.2c-1 1.1-1.6 2.5-1.6 4.2 0 6.7 3.8 8.3 7.3 8.3a4.8 4.8 0 0 0-1 3.5v4"/></svg>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
