"use client";
import { useEffect } from "react";
import { toast } from "sonner";

import { IncrementViews } from "@/lib/actions/question.action";

const View = ({ questionId }: { questionId: string }) => {
  const handleIncrement = async () => {
    const result = await IncrementViews({ questionId });

    if (result.success) {
      toast.success("Sucess", {
        description: "Views Increment",
      });
    } else {
      toast.error("Error", {
        description: result.error?.message,
      });
    }
  };
  useEffect(() => {
    handleIncrement();
  }, []);

  return null;
};

export default View;
