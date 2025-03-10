"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Heading1,
  Heading3,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-1 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border bg-main-primary text-black border-gray-700"
    >
      <div className="flex justify-start items-center gap-1 w-full  flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Heading3 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? " text-white bg-black p-1 rounded-[3px]"
              : " text-black p-1"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
        {content && (
          <button
            type="submit"
            className="py-1 px-2 bg-sky-700 text-[12px] text-white  rounded-md"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
