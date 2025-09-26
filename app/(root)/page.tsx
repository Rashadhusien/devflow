import Link from "next/link";
import React from "react";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const questions = [
  {
    _id: "1",
    title: "How to learn react",
    description: "i want to learn react , any help??",
    tags: [
      {
        _id: "1",
        name: "React",
      },
      {
        _id: "2",
        name: "JavaScript",
      },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2021-09-01"),
  },
  {
    _id: "2",
    title: "How to learn Javascript",
    description: "i want to learn javascipt , any help??",
    tags: [
      {
        _id: "1",
        name: "React",
      },
      {
        _id: "2",
        name: "JavaScript",
      },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const normalizedQuery = query?.toLowerCase() || "";
  const normalizedFilter = filter?.toLowerCase() || "";

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery =
      !normalizedQuery ||
      question.title.toLowerCase().includes(normalizedQuery) ||
      (question.description &&
        question.description.toLowerCase().includes(normalizedQuery));

    const matchesFilter =
      !normalizedFilter ||
      question.tags.some((tag) => tag.name.toLowerCase() === normalizedFilter);

    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 ">
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc={`/icons/search.svg`}
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <section className="mt-10">
        <HomeFilter />
      </section>
      <div className="mt-10 flex flex-col w-full gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
