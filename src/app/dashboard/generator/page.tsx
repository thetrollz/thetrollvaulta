"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function GeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState(0);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("");
      setStrength(0);
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);

    // Calculate strength
    let newStrength = 0;
    if (length >= 8) newStrength++;
    if (length >= 12) newStrength++;
    if (includeUppercase && includeLowercase) newStrength++;
    if (includeNumbers) newStrength++;
    if (includeSymbols) newStrength++;
    setStrength(newStrength);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getStrengthColor = () => {
    switch(strength) {
      case 0:
      case 1:
        return 'bg-destructive';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
      case 5:
        return 'bg-primary';
      default:
        return 'bg-muted';
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input
              readOnly
              value={password}
              className="h-12 font-code text-lg pr-20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                <Copy className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={generatePassword}>
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-muted overflow-hidden flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-full w-1/5 ${i < strength ? getStrengthColor() : ''} transition-colors`}></div>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="length">Password Length</Label>
                <span className="font-code text-primary">{length}</span>
              </div>
              <Slider
                id="length"
                min={8}
                max={64}
                step={1}
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))}
                />
                <label
                  htmlFor="uppercase"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Uppercase
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={(checked) => setIncludeLowercase(Boolean(checked))}
                />
                <label
                  htmlFor="lowercase"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Lowercase
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))}
                />
                <label
                  htmlFor="numbers"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Numbers
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))}
                />
                <label
                  htmlFor="symbols"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Symbols
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
