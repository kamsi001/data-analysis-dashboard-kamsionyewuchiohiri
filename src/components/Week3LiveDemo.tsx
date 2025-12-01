import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const COLORS = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];

const Week3LiveDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [nameError, setNameError] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [showMsg, setShowMsg] = useState(true);
  const [email, setEmail] = useState("");      
  const [age, setAge] = useState("");
  const [formMessage, setFormMessage] = useState(""); 

  const handleReset = () => {
    setCount(0);
    setName("");
    setGreeting("");
    setNameError("");
    setBgColor("#fff");
    setShowMsg(true);
    setEmail("");          
    setAge("");          
    setFormMessage("");    
  };

  {/* const handleNameSubmit = () => {
    setNameError("");
    const trimmedName = name.trim();

    if (!trimmedName) {
      setNameError("Please enter your name");
      return;
    }
    
    // Task 1: Minimum Length Validation (at least 3 characters)
    if (trimmedName.length < 3) {
      setNameError("Name must be at least 3 characters long.");
      return;
    }
    
    // Task 2: Maximum Length Validation (no more than 30 characters)
    if (trimmedName.length > 30) {
      setNameError("Name cannot be longer than 30 characters.");
      return;
    }

    // Challenge 2: Create different greeting messages based on name length
    let newGreeting = `Hello, ${trimmedName}!`;
    if (trimmedName.length > 15) {
        newGreeting += " That's a strong name! 💪";
    } else if (trimmedName.length >= 3) {
        newGreeting += " Welcome aboard! 👋";
    }

    setGreeting(newGreeting);
  }; */}

  const handleMultiFieldSubmit = () => {
    setFormMessage(""); // Clear previous messages
    
    const trimmedName = name.trim();
    const ageValue = Number(age);
    
    // --- 1. Name Validation (Required, 2-50 chars) ---
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      setFormMessage("Name must be between 2 and 50 characters.");
      return;
    }

    // --- 2. Age Validation (Number, 13-120) ---
    if (isNaN(ageValue) || ageValue < 13 || ageValue > 120) {
      setFormMessage("Age must be a number between 13 and 120.");
      return;
    }
    
    // --- 3. Email Validation (Challenge 1: Must contain @ and .) ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormMessage("Please enter a valid email address (must contain @ and .).");
      return;
    }

    // If all checks pass:
    setFormMessage(`✅ Success! Data submitted for ${trimmedName} (${email}).`);
  };

  return (
    <Card className="max-w-xl mx-auto" style={{ background: bgColor }}>
      <CardHeader>
        <CardTitle>Week 3 Interactive Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Counter Button */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-semibold">Counter: {count}</span>
          <Button onClick={() => setCount(count + 1)}>+1</Button>
        </div>

    {/*    Name Input
        <div className="flex flex-col items-center gap-2">
          <div className="w-full flex gap-2 items-center"> // New Wrapper div for input and clear button 
            <Input
                placeholder="Enter your name"
                value={name}
                // Task 2: Max length attribute for native browser limit
                maxLength={30} 
                onChange={e => {
                  setName(e.target.value);
                  setGreeting("");
                  setNameError("");
                }}
              />
            //  Task 4: Clear Button
              {name.length > 0 && (
                <Button variant="outline" onClick={() => setName("")}>Clear</Button>
              )}
          </div>
          
          // Task 3: Character Count 
          <div className="w-full flex justify-between text-xs text-gray-500 px-1">
              <span>
                  Characters: {name.length} / 30
              </span>
              <span>
                  Min: 3 | Max: 30
              </span>
          </div>

          <Button 
            onClick={handleNameSubmit}
            // Optional: Disable button if length is out of range
            disabled={name.length < 3 || name.length > 30}
          >
            Say Hello
          </Button>
          {nameError && <p className="text-red-600 text-sm">{nameError}</p>}
          {greeting && <p className="text-green-600 font-medium">{greeting}</p>}
        </div> */}

        {/*Multi-Field Form */}
        <div className="p-6 border border-purple-200 bg-purple-50 rounded-lg space-y-4 w-full"> {/* 👈 ADD THIS BLOCK */}
          <h3 className="text-lg font-bold text-purple-800">Email Address and Age</h3>

          {/* 1. Name Input */}
          <Input
            placeholder="Name (2-50 characters, Required)"
            value={name}
            maxLength={50}
            onChange={e => {
              setName(e.target.value);
              setFormMessage("");
            }}
          />


          {/* Character Count for Name */}
          <p className="text-xs text-gray-500 -mt-2">
              Characters: {name.length} / 50
          </p>

          {/* Email Input */}
          <Input
            placeholder="Email (must be valid)"
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setFormMessage("");
            }}
          />

          {/* Age Input */}
          {/* <div className="w-full flex gap-2 items-center"> */}
          <Input
            placeholder="Age (13-120)"
            type="number"
            value={age}
            onChange={e => {
              setAge(e.target.value);
              setFormMessage("");
            }}
          />

          {/* Clear Button for Advanced Form */}
          {(name || email || age) && ( // Check if any field has content
                <Button variant="outline" onClick={handleReset}>Clear All</Button>
            )}
        

          
          <Button 
            onClick={handleMultiFieldSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Submit All Data
          </Button>

          {formMessage && (
            <p className={`text-sm font-medium ${formMessage.startsWith("✅") ? 'text-green-600' : 'text-red-600'}`}>
              {formMessage}
            </p>
          )}
        </div>

        {/* Color Picker */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold">Pick a background color:</span>
          <div className="flex gap-2">
            {COLORS.map(color => (
              <button
                key={color}
                style={{ background: color, width: 32, height: 32, borderRadius: "50%", border: "2px solid #fff" }}
                onClick={() => setBgColor(color)}
                aria-label={`Pick ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" onClick={() => setShowMsg(v => !v)}>
            {showMsg ? "Hide Message" : "Show Message"}
          </Button>
          {showMsg && <p className="text-blue-600">Hope you're having a great time!</p>}
        </div>

        {/* Reset All */}
        <div className="flex flex-col items-center gap-2">
          <Button variant="destructive" onClick={handleReset}>Reset All</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Week3LiveDemo;