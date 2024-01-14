"use client"

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { reviewType } from "@/constants";
import { SiDoi } from "react-icons/si";
import { IoIosPaper } from "react-icons/io";
import icon from "@/public/icon.png";
import { useRouter } from 'next/navigation'
import { deleteReview } from "@/actions/review.action";

const Review = ({ reviewData, userId }: { reviewData: reviewType, userId?: string }) => {
  const router = useRouter()
  const editButton_clickHandler = () => {
    router.push(`/edit/${reviewData.id}`)
  }

  const deleteButton_clickHandler = () => {
    deleteReview(reviewData,userId);
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate leading-normal">
          {reviewData.paperTitle}
        </CardTitle>
        <CardDescription>{reviewData.authors}</CardDescription>
        <CardDescription>
          {reviewData.journal_name ? reviewData.journal_name + "." : ""}
          {reviewData.year ? reviewData.year + "." : ""}
          {reviewData.journal_vol ? reviewData.journal_vol + "." : ""}
          {reviewData.journal_pages ? reviewData.journal_pages + "." : ""}
        </CardDescription>
        {(reviewData.doi || reviewData.link) && (
          <div className="flex flex-row gap-2 py-3">
            {reviewData.doi && (
              <a href={`https://www.doi.org/${reviewData.doi}`} target="_blank">
                <SiDoi size="2rem" />
              </a>
            )}
            {reviewData.link && (
              <a href={`${reviewData.link}`} target="_blank">
                <IoIosPaper size="2rem" />
              </a>
            )}
          </div>
        )}
        {userId == reviewData.createdBy && (
            <Button onClick={editButton_clickHandler}>
                投稿を編集する
            </Button>
        )}

        {userId == reviewData.createdBy && (
            <Button onClick={deleteButton_clickHandler}>
                投稿を削除する
            </Button>
        )} 

        <Separator />
      </CardHeader>
			{ (reviewData.tags && reviewData.tags.length !== 0) &&
      <CardContent className="flex gap-2">
        {reviewData.tags
          ? reviewData.tags.map((tag) => {
              return (
                <Link
                  href={`?tag=${tag}`}
                  className="text-blue-400 hover:text-blue-600"
                >
                  #{tag}
                </Link>
              );
            })
          : ""}
      </CardContent> }
      <CardContent>
        <Link
          href={`/user/${reviewData.createdBy}`}
          className="flex text-blue-400 hover:text-blue-600 underline gap-2"
        >
          <Image
            src={icon}
            alt="Icon Image"
            className="rounded"
            width={24}
            height={24}
          />
          {reviewData.reviewerName}
        </Link>
      </CardContent>
      <CardContent className="break-words whitespace-pre-line">
        {reviewData.contents}
      </CardContent>
    </Card>
  );
};

export default Review;
