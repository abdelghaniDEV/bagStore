"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ImageUp, Plus, Trash, X } from "lucide-react";
import {
  getSingleProduct,
  postProduct,
  updateProduct,
} from "@/actions/productsActions";
import SelectCategory from "@/components/SelectCategory";
import TextEditor from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loadingImg from "@/assets/loading.svg";

type FormData = {
  name: string;
  description?: string;
  shortDescription?: string;
  discount?: number;
  price: number;
  stock: number;
  category: string[];
  images: File[];
  size: string[];
  color: string[];
};

type ErrorsMessages = {
  name?: string;
  price?: string;
  stock?: string;
  category?: string;
};

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    shortDescription: "",
    discount: 0,
    price: 0,
    stock: 0,
    category: [],
    images: [],
    size: [],
    color: [],
  });

  const [errors, setErrors] = useState<ErrorsMessages>({});
  const [loading, setLoading] = useState(false);

  // Fetch product data on mount
  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      setLoading(true);
      try {
        const productData = await getSingleProduct(id);
        console.log("productData", productData);
        if (productData) {
          setFormData({
            name: productData.product.name,
            description: productData.product.description,
            shortDescription: productData.product.shortDescription,
            price: productData.product.price,
            stock: productData.product.stock,
            discount : productData.product.discount,
            category: productData.product.categories.map((c: any) => c._id),
            images: productData.product.images,
            size: productData.product.size,

            color: productData.product.color,
          });
        }
      } catch (error) {
        toast.error("Failed to load product data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Handle file upload
  const handleFileChange = useCallback((files: FileList | null) => {
    if (!files) return;
    const filesArray = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...filesArray],
    }));
  }, []);

  // Handle image removal
  const handleRemoveImage = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }, []);

  // Handle size addition
  const handleAddSize = useCallback(() => {
    const sizeInput = document.querySelector<HTMLInputElement>("#sizeInput");
    const size = sizeInput?.value.trim().toUpperCase();
    if (!size || formData.size.includes(size)) return;
    setFormData((prev) => ({
      ...prev,
      size: [...prev.size, size],
    }));
    sizeInput!.value = "";
  }, [formData.size]);

  // Handle size removal
  const handleRemoveSize = useCallback((size: string) => {
    setFormData((prev) => ({
      ...prev,
      size: prev.size.filter((s) => s !== size),
    }));
  }, []);

  // Handle color addition
  const handleAddColor = useCallback(() => {
    const colorInput = document.querySelector<HTMLInputElement>("#colorInput");
    const color = colorInput?.value.trim();
    if (!color || formData.color.includes(color)) return;
    setFormData((prev) => ({
      ...prev,
      color: [...prev.color, color],
    }));
    colorInput!.value = "";
  }, [formData.color]);

  // Handle color removal
  const handleRemoveColor = useCallback((color: string) => {
    setFormData((prev) => ({
      ...prev,
      color: prev.color.filter((c) => c !== color),
    }));
  }, []);

  // Validate form data
  const validateData = useCallback(() => {
    const newErrors: ErrorsMessages = {};
    if (!formData.name) newErrors.name = "Product name is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.stock <= 0) newErrors.stock = "Stock must be greater than 0";
    if (formData.category.length === 0)
      newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateData()) return;

    console.log("Submit", formData);
    setLoading(true);
    try {
      const response = await updateProduct(id, formData);
      toast.success("Product successfully added");
      router.push("/admin/products");
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="lg:flex justify-between items-center mb-4">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0">
          <Link href="/admin/products" className="border p-2 md:p-3">
            <ArrowLeft />
          </Link>
          <div className="items-center gap-2 mt-[-5px] lg:mt-0">
            <span className="text-[12px]">Back To product list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4">
              Create Product
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <Image src={loadingImg} width={30} alt="loading" />
            ) : (
              "Create Product"
            )}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 pb-5 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <Card className="p-3 flex flex-col gap-6">
          {/* Product Name */}
          <div className="flex flex-col gap-2 relative">
            <Label>Product Name</Label>
            <Input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-[12px] text-red-500 absolute bottom-[-20px]">
                {errors.name}
              </p>
            )}
          </div>
          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label className="flex items-center justify-between">
              <span>Description</span>
              <span>120/1000</span>
            </Label>
            <TextEditor formData={formData} setFormData={setFormData} />
          </div>
          {/* Category */}
          <SelectCategory
            errors={errors}
            setFormData={setFormData}
            formData={formData}
          />
          {/* Pricing and Stock */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 relative">
              <Label>Pricing</Label>
              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-[12px] text-red-500 absolute bottom-[-20px]">
                  {errors.price}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Max Discount %</Label>
              <Input
                type="number"
                placeholder="Price"
                value={formData.discount}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, discount: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Stock</Label>
              <Input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    stock: e.target.value,
                  }))
                }
                className={errors.stock ? "border-red-500" : ""}
              />
              {errors.stock && (
                <p className="text-[12px] text-red-500 absolute bottom-[-20px]">
                  {errors.stock}
                </p>
              )}
            </div>
          </div>
        </Card>
        {/* Right Column */}
        <Card className="p-3 flex flex-col gap-4">
          {/* Product Images */}
          <Card className="p-3">
            <div className="flex flex-col gap-4">
              <Label>Product Images</Label>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-[200px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#F3F3F3] hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageUp className="w-[40px] h-[40px]" />
                  <p className="mb-2 text-sm font-[600]">
                    Click To upload or Drag and Drop
                  </p>
                  <p className="text-xs text-gray-500">
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
                    className="relative"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <Image
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt={`Image ${index}`}
                      width={80}
                      height={80}
                      className="w-[60px] h-[60px] rounded-md shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
          {/* Variant */}
          <div>
            <Label>Variant</Label>
          </div>
          <Card className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2 p-3">
            {/* Size */}
            <div className="flex flex-col gap-2 border-r pr-2">
              <Label>Size</Label>
              <span className="text-[12px] text-[#CCCBCB]">
                Add Available Sizes
              </span>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="sizeInput"
                  placeholder="Size Product"
                  className="flex uppercase w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                <Button onClick={handleAddSize}>+</Button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {formData.size.map((size, index) => (
                  <div
                    key={index}
                    className="bg-[#F5CAAB] w-10 h-10 relative text-center uppercase rounded-[5px] cursor-pointer"
                    onClick={() => handleRemoveSize(size)}
                  >
                    <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[13px]">
                      {size}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Color */}
            <div className="flex flex-col gap-2">
              <Label>Color</Label>
              <span className="text-[12px] text-[#CCCBCB]">
                Add Available Colors
              </span>
              <div className="flex gap-3">
                <Input type="color" id="colorInput" className="h-10 w-10 p-0" />
                <Button onClick={handleAddColor}>+</Button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {formData.color.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 relative rounded-[5px] cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => handleRemoveColor(color)}
                  />
                ))}
              </div>
            </div>
          </Card>
          {/* Short Description */}
          <div className="flex flex-col gap-2">
            <Label>Short Description</Label>
            <textarea
              className="flex h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Short Description"
              value={formData.shortDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shortDescription: e.target.value,
                }))
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
