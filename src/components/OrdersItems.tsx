import React from 'react'
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { Button } from './ui/button';
import { orderItem } from '@/type';

interface OrderItemsProps {
  order: orderItem;
}


export default function OrdersItems({order} : OrderItemsProps) {
  return (
    <div>
        <Card className="p-4">
            <h3 className="font-[500] pb-5 text-[20px]">Order Items : </h3>
            <div className="flex-col gap-4 flex">
              {order?.products.map((product) => {
                return (
                  <div
                    key={product._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-start gap-2">
                      <div>
                        <Image
                          src={product.product.images[0]}
                          unoptimized
                          alt={product.product.name}
                          width={60}
                          height={60}
                          className="w-[60px] h-[75px] rounded-[8px]"
                        />
                      </div>
                      <div>
                        <span className="text-[14px] text-main-text">
                          {product.product.categories[0].name}
                        </span>
                        <h4 className="font-[500]">{product.product.name}</h4>
                        <div className="flex items-center gap-2">
                          {product.size && (
                            <div className="flex items-center gap-1">
                              Size :{" "}
                              <span className="text-[14px] text-main-text font-[500]">
                                {product.size}
                              </span>
                            </div>
                          )}
                          {product.color && (
                            <div className="flex items-center gap-1">
                              color :{" "}
                              <div
                                className="h-6 w-6 rounded-[10px]"
                                style={{ backgroundColor: product.color }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col xl:flex-wrap items-center gap-2">
                      <Button className="h-7 flex items-center gap-2">
                        <span>{product.quantity}</span> <span>x</span>{" "}
                        <span>${product.product.price}</span>
                      </Button>
                      <span>$ {product.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
    </div>
  )
}
