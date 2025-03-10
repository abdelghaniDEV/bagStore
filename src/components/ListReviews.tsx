"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReviewCart from "./ReviewCart";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllReviews, rating } from "@/actions/reviews.actions";
import { reviewsItem } from "@/type";
import Pagination from "./Pagination";
import { Frown, Laugh, MessageSquare, Smile, Star } from "lucide-react";

type reviews = {
  status: string;
  count: number;
  totalReviews: number;
  averageRating : number;
  goodReviews : number;
  badReviews : number;
  totalPages: number;
  data: reviewsItem[];
};

type Review = {
  review: reviewsItem;
};

export default function ListReviews() {
  const searchParams = useSearchParams();
  const [reviews, setReviews] = useState<reviews>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(searchParams.get("page") || "1");

  const router = useRouter();

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await getAllReviews(page, "10");
        setReviews(response);
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [page]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-5 pb-6">
        <div className="relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] py-6 px-4  shadow-md bg-[#F9F9F9] text-black">
          <h3 className="text-[16px] font-[500]">All Feedback</h3>
          <div className="flex gap-[7px]">
            <MessageSquare />
            <MessageSquare className="h-[150px] w-[150px] absolute top-3 right-[-40px] text-[#6AB08D]" />
            <h1 className="text-[30px] font-[600]">{reviews?.totalReviews}</h1>
          </div>
          <div className="flex items-center">
            <i className="bx bxs-chevrons-up text-[#8BE78B]"></i>
            <h3 className="text-[14px]">
              <span className="text-[#8BE78B] font-[600]">+35 %</span> from last
              month
            </h3>
          </div>
        </div>
        <div className="relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] py-6 px-4  shadow-md bg-[#F9F9F9] text-black">
          <h3 className="text-[16px] font-[500]">Review Rating</h3>
          <div className="flex gap-[7px]">
            <Star />
            <Star className="h-[150px] w-[150px] absolute top-3 right-[-40px] text-[#6AB08D]" />
            <h1 className="text-[30px] font-[600]">{reviews?.averageRating}</h1>
          </div>
          <div className="flex items-center">
            <i className="bx bxs-chevrons-up text-[#8BE78B]"></i>
            <h3 className="text-[14px]">
              <span className="text-[#8BE78B] font-[600]">+35 %</span> from last
              month
            </h3>
          </div>
        </div>
        <div className="relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] py-6 px-4  shadow-md bg-[#F9F9F9] text-black">
          <h3 className="text-[16px] font-[500]">Avr . Satisfication</h3>
          <div className="flex items-center gap-5">
          <Laugh className="h-[150px] w-[150px] absolute top-3 right-[-40px] text-[#6AB08D]" />
          <div className="flex flex-col items-center gap- py-2 px-4 rounded-[10px] text-white text-[#] bg-[#6AB08D]">
              <Smile />
              <span className="font-[500] text-[25px]">{reviews?.goodReviews}</span>
          </div>
          <div className="flex flex-col items-center gap- py-2 px-4 rounded-[10px] text-white text-[#] bg-[#F66D6E]">
              <Frown />
              <span className="font-[500] text-[25px]">{reviews?.badReviews}</span>
          </div>
          </div>
        </div>
      </div>
      <Table className="border  ">
        <TableHeader className="bg-[#F9F9F9] ">
          <TableRow className="md:text-[14px] text-[15px]">
            <TableHead className="">Name of Review</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead className="">Rate</TableHead>

            <TableHead className="w-[360px]">Review</TableHead>

            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="ml-4">
          {/* <ReviewCart /> */}
          {reviews?.data.map((review: reviewsItem) => {
            return <ReviewCart key={review._id} review={review} />;
          })}
        </TableBody>
      </Table>

      {Number(reviews?.totalPages) > 1 && (
        <Pagination
          totalPages={Number(reviews?.totalPages)}
          currentPage={Number(page)}
          setPage={setPage}
          page={Number(page)}
        />
      )}
    </div>
  );
}
