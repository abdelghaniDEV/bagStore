"use client";

import React, { useEffect, useState } from "react";
import Tiptap from "./Tiptap";

type TextEditorProps = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const TextEditor = ({ formData, setFormData }: TextEditorProps) => {
  const [content, setContent] = useState<string>("");
  console.log("content",content);

  useEffect(() => {
    setContent(formData.description); // Avoid undefined issues

  }, [formData.description , content]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setFormData((prev: any) => ({
      ...prev,
      description: newContent, // Use newContent directly
    }));
    // Check the updated formData after change
  };

  return (
    <div className="max-w-3xl w-full grid place-items-center mx-auto">
      <Tiptap content={content} onChange={handleContentChange} />
    </div>
  );
};

export default TextEditor;
