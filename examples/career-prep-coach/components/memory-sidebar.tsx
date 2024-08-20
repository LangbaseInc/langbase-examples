"use client"
import React, { useState, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { z } from 'zod';

const memorySchema = z.object({
  name: z.string()
    .min(1, "Memory name is required")
    .regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, "Name must start with a letter and can only contain letters, numbers, underscores, and dashes"),
  description: z.string()
    .min(1, "Memory description is required")
    .regex(/^[a-zA-Z][a-zA-Z0-9_-]*$/, "Description must start with a letter and can only contain letters, numbers, underscores, and dashes"),
});



interface MemorySidebarProps {
  memorySets: any[];
  selectedMemory: string;
  refreshMemorySets: () => Promise<void>;
  onMemorySelect: (memoryUrl: string) => void;
  userApiKey: string; 
  setUserApiKey: (apiKey: string) => void;
  ownerLogin: string;
  setOwnerLogin: (login: string) => void; 
}

export function MemorySidebar({ memorySets, selectedMemory, refreshMemorySets, onMemorySelect, userApiKey, setUserApiKey, ownerLogin, setOwnerLogin}: MemorySidebarProps) {
  const [memoryName, setMemoryName] = useState('');
  const [memoryDescription, setMemoryDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [apiKeyInput, setApiKeyInput] = useState(userApiKey);
  const [ownerLoginInput, setOwnerLoginInput] = useState(ownerLogin);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKeyInput(e.target.value);
  };

  const handleSaveApiKey = () => {
    setUserApiKey(apiKeyInput);
    toast.success('API Key saved successfully');
  };

  const handleOwnerLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setOwnerLoginInput(e.target.value);
  };

  const handleSaveOwnerLogin = () => { 
    setOwnerLogin(ownerLoginInput);
    toast.success('Owner Login saved successfully');
  };

  const handleCreateMemory = async () => {
    try {

      const validatedData = memorySchema.parse({ name: memoryName, description: memoryDescription });
      const response = await fetch('/api/chat?action=createMemory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validatedData, userApiKey })
      });
      if (!response.ok) throw new Error('Failed to create memory');
      const data = await response.json();
      toast.success('Memory created successfully');
      refreshMemorySets();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Error creating memory');
        console.error('Error creating memory:', error);
      }
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }
    if (!memoryName.trim() || !memoryDescription.trim()) {
      toast.error('Memory name and description are required');
      return;
    }
    try {
      const validatedData = memorySchema.parse({ name: memoryName, description: memoryDescription });
      const formData = new FormData();
      formData.append('fileName', file, file.name);
      formData.append('memoryName', validatedData.name);
      formData.append('memoryDescription', validatedData.description);
      formData.append('userApiKey', userApiKey);
      formData.append('ownerLogin', ownerLogin); 

      const response = await fetch('/api/chat?action=uploadFile', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', response.status, errorText);
        throw new Error(`Failed to upload file: ${response.status} ${errorText}`);
      }
  
      toast.success('File uploaded successfully');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Error uploading file');
        console.error('Error uploading file:', error);
      }
    }
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error('File size exceeds 10MB limit');
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName('');
      toast.error('Please select a PDF file');
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleMemorySelect = async (memoryUrl: string) => {
    onMemorySelect(memoryUrl);
    const selectedSet = memorySets.find((set: any) => set.url === memoryUrl);
    if (selectedSet) {
      try {
        const response = await fetch('/api/chat?action=updatePipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ memoryName: selectedSet.name, userApiKey, ownerLogin }) // Pass userApiKey here
        });
        if (!response.ok) throw new Error('Failed to update pipe');
        const data = await response.json();
        toast.success('Memory attached successfully');
        console.log('Pipe updated:', data);
      } catch (error) {
        toast.error('Error attaching memory');
        console.error('Error updating pipe:', error);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-lg font-semibold">Attach Memory</h2>
      <label htmlFor="apiKeyInput">User API Key</label>
      <input
        id="apiKeyInput"
        type="text"
        placeholder="Enter your API key"
        value={apiKeyInput}
        onChange={handleApiKeyChange}
        className="w-full px-2 py-1 text-sm border rounded bg-muted"
      />
      <Button onClick={handleSaveApiKey} variant="outline-background">
        Save API Key
      </Button>
      <label htmlFor="ownerLoginInput">Owner Login</label> {/* Add this input */}
      <input
        id="ownerLoginInput"
        type="text"
        placeholder="Enter owner login"
        value={ownerLoginInput}
        onChange={handleOwnerLoginChange}
        className="w-full px-2 py-1 text-sm border rounded bg-muted"
      />
      <Button onClick={handleSaveOwnerLogin} variant="outline-background">
        Save Owner Login
      </Button>
      <Button onClick={() => {
        refreshMemorySets();
      }} variant="outline">
        Refresh Memory Sets
      </Button>
      <p className='text-sm text-muted-foreground'> Select Memory after refresh</p>
      <Select onValueChange={handleMemorySelect} value={selectedMemory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a memory" />
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(memorySets) ? memorySets.map((memorySet: any) => (
            <SelectItem key={memorySet.url} value={memorySet.url}>
              {memorySet.name}
            </SelectItem>
          )) : null}
        </SelectContent>
      </Select>
      <label htmlFor="memoryName">Memory Name</label>
      <input
        id="memoryName"
        type="text"
        placeholder="Enter memory name"
        value={memoryName}
        onChange={(e) => setMemoryName(e.target.value)}
        className="w-full px-2 py-1 text-sm border rounded  bg-muted"
      />
      <label htmlFor="memoryDescription">Memory Description</label>
      <input
        id="memoryDescription"
        type="text"
        placeholder="Enter memory description"
        value={memoryDescription}
        onChange={(e) => setMemoryDescription(e.target.value)}
        className="w-full px-2 py-1 text-sm border rounded bg-muted"
      />
      <Button onClick={handleCreateMemory} variant="outline-background">
        Create Memory
      </Button>
      <label htmlFor="selectedFile">Selected File</label>
      <input
        id="selectedFile"
        type="text"
        placeholder="No file selected"
        value={fileName}
        readOnly
        className="w-full px-2 py-1 text-sm border rounded bg-muted"
      />
      <input
        id="fileInput"
        ref={fileInputRef}
        type="file"
        readOnly
        accept=".pdf"
        onChange={handleFileChange}
        aria-label="Select pdf file to upload"
        style={{ display: 'none' }}
        title="Choose a pdf file to upload"
      />
      <Button onClick={handleFileSelect} variant="destructive-hover" aria-label="Select file PDF file" title="Click to select a PDF file">
        Select File
      </Button>
      <Button onClick={handleFileUpload} variant="outline-background">
        Upload File to Memory
      </Button>
    </div>
  );
}