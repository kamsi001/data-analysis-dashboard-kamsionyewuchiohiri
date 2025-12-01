import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Bonus Feature: Color Data ---
const COLOR_OPTIONS = [
  { value: 'none', label: '— Select Color —' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'red', label: 'Red' },
];

const NameInput = () => {
  // --- Bonus Feature: Remember last name (localStorage) ---
  const [name, setName] = useState(() => localStorage.getItem('last_name') || '');
  
  // --- Core Requirement States ---
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [greeting, setGreeting] = useState('');
  
  // --- Bonus Feature: Favorite Color State ---
  const [color, setColor] = useState('none');
  
  // --- Validation Functions ---
  const validateName = (value: string) => {
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters.";
    }
    return ''; // No error
  };

  const validateEmail = (value: string) => {
    // Core Requirement: Email must contain @ and . (Only validates if the field is not empty)
    if (value.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Email must contain @ and . and be a valid format.";
      }
    }
    return ''; // No error
  };
  
  // --- Event Handlers ---

  // Handles state change for Name and performs real-time validation (Core 1, Bonus)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    
    // Real-time validation
    const error = validateName(newName);
    setNameError(error);
    
    // Clear greeting when user starts typing again
    setGreeting('');
  };

  // Handles state change for Email and performs real-time validation (Core 2)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Real-time validation
    const error = validateEmail(newEmail);
    setEmailError(error);
  };
  
  // Handles the final submission (Core 1)
  const handleSubmit = () => {
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);

    setNameError(nameValidation);
    setEmailError(emailValidation);

    if (!nameValidation && !emailValidation) {
      // Set greeting message
      const colorText = color !== 'none' ? ` Your favorite color is ${color}!` : '';
      setGreeting(`Hello, ${name.trim()}! Submission successful.${colorText}`);
      
      // --- Bonus Feature: Remember last entered name (localStorage) ---
      localStorage.setItem('last_name', name.trim());
    } else {
      setGreeting(''); // Clear previous success messages on failed submit
    }
  };
  
  // --- Core Requirement: Clear Button Logic ---
  const handleClear = () => {
    setName('');
    setEmail('');
    setNameError('');
    setEmailError('');
    setGreeting('');
    setColor('none'); // Reset color dropdown
    // Note: We don't clear localStorage here, as the assignment asks to *remember* it.
  };

  // --- JSX Rendering ---
  return (
    <Card className="max-w-4xl w-full mx-auto shadow-xl bg-blue-50 border border-gray-200 font-sans text-gray-900">
      <CardHeader className="border-b border-gray-100 p-4">
        <CardTitle className="text-blue-600 text-3xl font-bold">FILL IN YOUR INFORMATION</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        
        {/* Landscape Grouping: Inputs side-by-side (Reduced vertical spacing) */}
        <div className="grid md:grid-cols-3 gap-3">
            
            {/* 1. Name Input (Core 1) */}
            <div className="space-y-1 md:col-span-1">
                <label htmlFor="name-input" className="text-sm font-medium text-gray-700 block">Name (required)</label>
                <Input
                    id="name-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                    className={nameError ? 'border-red-500' : 'border-gray-300'}
                />
                {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
                
                {/* Bonus Feature: Show character count as user types */}
                <p className="text-xs text-gray-500 pt-1">Characters: {name.length}</p>
            </div>

            {/* 2. Email Input (Core 2) */}
            <div className="space-y-1 md:col-span-1">
                <label htmlFor="email-input" className="text-sm font-medium text-gray-700 block">Email (optional)</label>
                <Input
                    id="email-input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={emailError ? 'border-red-500' : 'border-gray-300'}
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            {/* Bonus Feature: Favorite Color Dropdown (Bonus) */}
            <div className="space-y-1 md:col-span-1">
                <label htmlFor="color-select" className="text-sm font-medium text-gray-700 block">Favorite Color</label>
                <Select onValueChange={setColor} value={color}>
                    <SelectTrigger id="color-select" className="border-gray-300">
                        <SelectValue placeholder="— Select Color —" />
                    </SelectTrigger>
                    <SelectContent>
                        {COLOR_OPTIONS.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        {/* Greeting Message (Core 1) - Full Width */}
        {greeting && (
          <p className="text-green-600 font-medium p-3 bg-green-50 border border-green-200 rounded">
            {greeting}
          </p>
        )}

        {/* Buttons (Core 1 & 3) - Consistent Spacing and Right Alignment */}
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
          <Button 
            onClick={handleClear} 
            variant="outline"
            className="w-24 text-gray-600 border-gray-300 hover:bg-gray-100"
          >
            Clear
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!!nameError || !!emailError}
            className="w-32 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};

export default NameInput;