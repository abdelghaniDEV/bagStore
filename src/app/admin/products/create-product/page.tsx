"use client";
import { postProduct } from "@/actions/productsActions";
import SelectCategory from "@/components/SelectCategory";
import TextEditor from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/redux/store";
import axios from "axios";
import { ArrowLeft, ImageUp, Plus, Trash, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import loadingImg from "@/assets/loading.svg"

type formData = {
  name: string;
  description?: string;
  shortDescription?: string;
  price: number;
  stock: number;
  category: string[];
  images: [];
  size: string[];
  color: string[];
};

type ErrorsMessages = {
  name?: string;
  price?: string;
  stock?: string;
  category?: string;
};

export default function CreateProduct() {
  const [formData, setFormData] = useState<formData>({
    name: "",
    description: "",
    shortDescription : "",
    price: 0,
    stock: 0,
    category: [],
    images: [],
    size: [],
    color: [],
  });

  const [errors, setErrors] = useState<ErrorsMessages>({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  const [loading, setLeading] = useState(false);
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // handle input Images
  const handleFileChange = (e: any) => {
    const filesArray = Array.from(e);
    setFormData((prev: any) => {
      return {
        ...prev,
        images: [...prev.images, ...filesArray],
      };
    });
  };

  const handelRemoveImage = (index: any) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        images: [
          ...prev.images.slice(0, index),
          ...prev.images.slice(index + 1),
        ],
      };
    });
  };

  // handle input size
  const handelAddSize = () => {
    const inputElement =
      document.querySelector<HTMLInputElement>("#sizeInput")?.value;
    if (!inputElement || formData.size.includes(inputElement)) return;
    setFormData((prev: any) => {
      return {
        ...prev,
        size: [...prev.size, inputElement],
      };
    });
  };

  const handleRemoveSize = (size: any) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        size: prev.size.filter((s: any) => s !== size),
      };
    });
  };

  // handle input color
  const handelAddColor = () => {
    const inputElement =
      document.querySelector<HTMLInputElement>("#colorInput")?.value;
    if (!inputElement || formData.color.includes(inputElement)) return;
    setFormData((prev: any) => {
      return {
        ...prev,
        color: [...prev.color, inputElement],
      };
    });
  };
  const handleRemoveColor = (color: any) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        color: prev.color.filter((c: any) => c !== color),
      };
    });
  };

  // check Data
  const validateData = () => {
    let isValid = true;
    const newErrors: ErrorsMessages = {};
    if (!formData.name) {
      newErrors.name = "Product name is required";
      isValid = false;
    }
    if (formData.price <= 0) {
      newErrors.price = "Price is required";
      isValid = false;
    }
    if (formData.stock === 0) {
      newErrors.stock = "Stock is required";
      console.log("Stock is required")
      console.log(formData.stock)
      isValid = false;
    }
    if (formData.category.length === 0) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateData()) {
      console.log("Submit");
      setLeading(true);
      const response = await postProduct(formData);
      toast.success("Product successfully added");
      setLeading(false);
      console.log("success Submit", response);
    } else {
      console.log(errors);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link href={"/admin/products"} className="border p-2 md:p-3  ">
            <ArrowLeft />
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            <span className="text-[12px] ">Back To product list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Create Product
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <Button onClick={(e) => handleSubmit(e)}>
          {loading ? (
                <Image src={loadingImg} width={30} alt="loading" />
              ) : (
                <span>Create Product</span>
              )}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 pb-5 md:grid-cols-2 gap-4">
        <Card className="p-3 flex flex-col gap-6">
          <div className="flex flex-col gap-2 relative">
            <Label>Product Name</Label>
            <Input
              type="text"
              placeholder="Product Name"
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
              className={errors.name && "border-red-500"}
            />
            {errors.name && (
              <p className="text-[12px] text-red-500 absolute bottom-[-20px]">
                {errors.name}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label className="flex items-center justify-between">
              <span>Description</span>
              <span>120/1000</span>
            </Label>
            <TextEditor formData={formData} setFormData={setFormData} />
          </div>
          <SelectCategory
            errors={errors}
            setFormData={setFormData}
            formData={formData}
            
          />
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 relative">
              <Label>Pricing</Label>
              <Input
                type="number"
                placeholder="Price"
                onChange={(e) =>
                  setFormData((prev: any) => {
                    return { ...prev, price: e.target.value };
                  })
                }
                className={errors.price && "border-red-500"}
              />
              {errors.price && (
                <p className="text-[12px] text-red-500 absolute bottom-[-20px]">
                  {errors.price}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Max Discount %</Label>
              <Input type="number" placeholder="Price" />
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Stock</Label>
              <Input
                type="number"
                placeholder="Stock"
                onChange={(e) =>
                  setFormData((prev: any) => {
                    return { ...prev, stock: e.target.value };
                  })
                }
                className={errors.stock && "border-red-500"}
              />
              {errors.stock && (
                <p className="text-[12px] text-red-500 absolute bottom-[-20px]">
                  {errors.stock}
                </p>
              )}
            </div>
          </div>
        </Card>
        <Card className="p-3 flex flex-col gap-4">
          <Card className="p-3">
            <div className="flex flex-col gap-4">
              <Label>Product Images</Label>
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
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files)}
                />
              </label>
              <div className="flex items-center gap-2">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 relative "
                    onClick={() => handelRemoveImage(index)}
                  >
                    <Image
                      alt="i"
                      width={80}
                      height={80}
                      className="w-[60px] h-[60px] rounded-md shadow-lg"
                      src={URL.createObjectURL(image)}
                    />
                    {/* <Trash
                      className="absolute text-white w-5 h-5 bg-red-500 p-1 rounded-[10px] top-1 right-1 cursor-pointer "
                      
                    /> */}
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <div>
            <Label>Variant</Label>
          </div>
          <Card className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2 p-3">
            <div className="flex flex-col gap-2 border-r pr-2 ">
              <Label>Size</Label>
              <span className="text-[12px] text-[#CCCBCB]">
                Add Available Sizes
              </span>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="sizeInput"
                  placeholder="Size Product"
                  className="flex uppercase  w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                <Button onClick={handelAddSize}>+</Button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {formData?.size.map((size, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-[#F5CAAB bg-main-primary w-10 h-10 relative text-center uppercase rounded-[5px] cursor-pointer"
                      onClick={() => handleRemoveSize(size)}
                    >
                      <span
                        key={index}
                        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[13px] "
                      >
                        {size}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Color</Label>
              <span className="text-[12px] text-[#CCCBCB]">
                Add Available Colors
              </span>
              <div className="flex gap-3">
                <Input
                  type="color"
                  id="colorInput"
                  placeholder="Size Product"
                  className="h-10 w-10 p-0"
                />
                <Button onClick={handelAddColor}>+</Button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {formData?.color.map((color, index) => {
                  return (
                    <div
                      className="bg-[#F5CAAB bg-main-primary w-10 h-10 relative text-center uppercase rounded-[5px] cursor-pointer"
                      onClick={() => handleRemoveColor(color)}
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      <span
                        key={index}
                        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[13px] "
                      ></span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
          <div className="flex flex-col gap-2">
            <Label>Short Description</Label>
            <textarea
              className="flex h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Short Description"
              
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, shortDescription: e.target.value };
                })
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
