"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchCategories } from "@/redux/slices/categoriesSlice";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import { ArrowLeft, ImageUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type data = {
  name: string;
  image?: any;
};

async function fetchCategory(id: string) {
  try {
    const response = await axios(`http://localhost:2000/api/categories/${id}`);
    console.log("success", response);
    return response;
  } catch (err) {
    console.error("Error", err);
  }
}

export default function EditeCategory() {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<data>({
    name: "",
    
  });

  const [prevUrl, setPrevUrl] = useState<any>();

  const params = useParams();
  const id = params.id as string;
  useEffect(() => {
    if (!id) return;

    const loadCategory = async () => {
      const categoryData = await fetchCategory(id);
      console.log("categoryData", categoryData);
      if (categoryData) {
        setData({
          name: categoryData.data.category.name,
        });
        if (categoryData.data.category.image) {
          setPrevUrl(categoryData.data.category.image);
        }
      }
    };

    loadCategory();
  }, [id]);

  const [error, setError] = useState<string>("");
  const handleSubmit = async () => {
    if (data.name) {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.image) {
        formData.append("image", data.image[0]);
      }else {
        formData.append("image", prevUrl);
      }
      try {
        const response = await axios.put(
          `http://localhost:2000/api/categories/${id}`,
          formData
        );
        setError("");
        dispatch(fetchCategories());
        console.log("success Submit", response);
      } catch (err: any) {
        console.error("Error", err);
        if (err.response.status) {
          setError(err.response.data.message);
        }
      }
    } else {
      setError("Name is Required");
    }
  };
  return (
    <div className="relative">
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link href={"/admin/categories"} className="border p-2 md:p-3  ">
            <ArrowLeft />
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            <span className="text-[12px] ">Back To Categories list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Edite Category
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <Button onClick={(e) => handleSubmit()}>Save Category</Button>
        </div>
      </div>
      {/*... */}
      <Card className="flex flex-col gap-6 p-6 w-[700px] absolute left-[50%] mt-8 translate-x-[-50%]">
        <div className="flex flex-col gap-2 relative">
          <Label>Categoy Name</Label>
          <Input
            type="text"
            value={data?.name || ""}
            placeholder="Product Name"
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, name: e.target.value.trim() };
              })
            }
            className={error && "border-red-500"}
          />
          {error && (
            <p className="text-[12px] text-red-500 absolute bottom-[-20px]">
              {error}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Label>Category Images</Label>
          <div className="grid grid-cols-2 gap-8">
            <label
              htmlFor="dropzone-file"
              id="input-image"
              className="flex flex-col items-center justify-center w-full h-[200px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#F3F3F3] dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageUp className="text-[#] w-[40px] h-[40px]" />
                <p className="mb-2 text-sm  font-[600]">
                  Click To upload or Drag and Drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                onChange={(e) => {
                  setData((prev: any) => {
                    return { ...prev, image: e.target.files };
                  });
                  
                }}
              />
            </label>
            <div>
              {data.image ? (
                <Image
                  src={URL.createObjectURL(data.image[0])}
                  alt={data.name}
                  width={100}
                  height={100}
                  className="w-full h-[200px] rounded-lg"
                />
              ) : (
                prevUrl && (
                  <Image
                    src={prevUrl}
                    alt={data.name}
                    width={100}
                    height={100}
                    className="w-full h-[200px] rounded-lg"
                    onClick={() => setPrevUrl('')}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
