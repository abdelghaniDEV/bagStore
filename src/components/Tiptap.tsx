"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";

const Tiptap = ({ onChange, content }: { onChange: (newContent: string) => void; content: string }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content, // ✅ Initial content
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 items-start w-full min-h-[200px] max-h-[400px] overflow-scroll gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // ✅ Update state when content changes
    },
  });

  // ✅ Use useEffect to update the content safely
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, false); // `false` prevents adding it to undo history
    }
  }, [content, editor]);

  return (
    <div className="w-full">
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
