"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type selectedCategoryProps = {
  errors: any;
  setFormData: (data: any) => void;
  formData: any;
};

type category = {
  _id: string;
  name: string;
  image?: string;
};

export default function SelectCategory({
  errors,
  setFormData,
  formData,
}: selectedCategoryProps) {
  const categories = useSelector(
    (state: RootState) => state.categories
  ) as category[];

  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    formData.category
  );

  useEffect(() => {
    setSelectedCategory(formData.category);
  }, [formData ]);

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      category: selectedCategory,
    }));
  }, [selectedCategory , setFormData]);

  const handelSelectChange = (e: string) => {
    if (!selectedCategory.includes(e)) {
      setSelectedCategory([...selectedCategory, e]);
    }
  };

  const removeSelectedCategory = (category: string) => {
    setSelectedCategory(selectedCategory.filter((c) => c !== category));
  };
  return (
    <div>
      <div className="flex flex-col gap-2 relative">
        <Label>Category</Label>
        <Select onValueChange={(e) => handelSelectChange(e)}>
          <SelectTrigger
            className={`w-full ${errors.category && "border-red-500"}`}
          >
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-red-500 text-[13px] absolute bottom-[-20px]">
            {errors.category}
          </p>
        )}
      </div>
      <div className="pt-5">
        {selectedCategory.map((category, index) => (
          <span
            onClick={() => removeSelectedCategory(category)}
            key={index}
            className=" cursor-pointer inline-block bg-main-primary text-gray-700  px-5 py-2 rounded-[8px] text-sm font-semibold mr-2 mb-2"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
