import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import SelectPorductsOrder from "./SelectPorductsOrder";
import { Card } from "./ui/card";

export default function OrderFomr() {
  return (
    <div>
      <div className="pt-4 pb-8">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {/* Full Name */}
          <Card className="flex flex-col gap-5 p-4">
            <div>
              <h4 className="text-[25px] font-[500]">Shipping Information</h4>
              <p className="text-gray-400 text-[14px]">
                Complete your order by providing your shipping details.
              </p>
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 relative">
              <Label>
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter Email Address"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <Label>
                Country <span className="text-red-500">*</span>
              </Label>
              <Input type="text" name="country" placeholder="Enter Country" />
            </div>

            <div className="flex flex-col gap-2 relative">
              <Label>
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="phone"
                placeholder="Enter phone Number"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2 relative">
              <Label>
                Address <span className="text-red-500">*</span>
              </Label>
              <Input type="text" name="address" placeholder="Enter Address" />
            </div>
            {/* City & ZIP Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 relative">
                <Label>
                  City <span className="text-red-500">*</span>
                </Label>
                <Input type="text" name="city" placeholder="Enter City" />
              </div>
              <div className="flex flex-col gap-2 relative">
                <Label>
                  ZIP Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="Enter ZIP Code"
                />
              </div>
              <Button type="submit">Send Order</Button>
            </div>
          </Card>
          <div>
            <SelectPorductsOrder />
          </div>
        </form>
      </div>
    </div>
  );
}
