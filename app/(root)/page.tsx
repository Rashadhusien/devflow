import Link from "next/link";
import React from "react";

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
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
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
    author: { _id: "1", name: "John Doe" },
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
  const { query = "" } = await searchParams;

  // const {data} = await axios.get("/api/questions", {query: {search:query}})

  const filterdQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 ">
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-10">
        <LocalSearch
          route="/"
          imgSrc={`/icons/search.svg`}
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        HomeFilter
      </section>
      <div className="mt-10 flex flex-col w-full gap-6">
        {filterdQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
