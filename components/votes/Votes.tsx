"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { use, useState } from "react";
import { toast } from "sonner";

import { createVote } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";
import { HasVotedResponse } from "@/types/action";
import { ActionResponse } from "@/types/global";

interface Props {
  targetType: "question" | "answer";
  targetId: string;
  upVotes: number;
  downVotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({
  targetType,
  targetId,
  upVotes,
  downVotes,
  hasVotedPromise,
}: Props) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { success, data } = use(hasVotedPromise);

  const [isLoading, setIsLoading] = useState(false);

  const { hasUpvoted, hasDownvoted } = data || {};

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) {
      return toast.error("Please login to vote", {
        description: "Only logged-in users can vote.",
      });
    }

    setIsLoading(true);

    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });

      if (!result) {
        return toast.error("Faild to vote.", {
          description: result.error.message,
        });
      }
      const successMessage =
        voteType === "upvote"
          ? `Upvoted ${!hasUpvoted ? "added" : "removed"} successfully`
          : `Downvoted ${!hasDownvoted ? "added" : "removed"} successfully`;

      toast.success(successMessage, {
        description: "Your vote has been counted.",
      });
    } catch {
      toast.error("Error", {
        description: "An Error occurred while voting, Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5 ">
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"
          }
          width={18}
          height={18}
          alt="upvote"
          className={`cursor-pointer ${isLoading && "opacity-50"} `}
          aria-label="upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(upVotes)}
          </p>
        </div>
      </div>
      <div className="flex-center gap-1.5">
        <Image
          src={
            success && hasDownvoted
              ? "/icons/downvoted.svg"
              : "/icons/downvote.svg"
          }
          width={18}
          height={18}
          alt="downvote"
          className={`cursor-pointer ${isLoading && "opacity-50"} `}
          aria-label="downvote"
          onClick={() => !isLoading && handleVote("downvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(downVotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
