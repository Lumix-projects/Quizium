"use client";

import { useState } from "react";
import Link from "next/link";
import { Topic } from "@/types";
import { FiChevronDown } from "react-icons/fi";

interface TopicsListProps {
  topics: Topic[];
  subjectId: string;
}

export default function TopicsList({ topics, subjectId }: TopicsListProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  
  const visibleTopics = topics.slice(0, visibleCount);
  const hasMore = visibleCount < topics.length;

  const handleLoadMore = () => {
    setVisibleCount((count) => count + 5);
  };

  return (
    <div className="flex flex-col gap-4">
      {visibleTopics.map((topic) => (
        <Link
          href={`/subjects/${subjectId}/${topic.id}`}
          key={topic.id}
          className="block"
        >
          <div className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-foreground">{topic.title}</h3>

              {topic.tags?.length > 0 && (
                <div className="flex gap-2">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-1">
              {topic.description}
            </p>
          </div>
        </Link>
      ))}

      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="flex items-center justify-center gap-2 w-full py-3 mt-2 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl transition-all duration-200"
        >
          <span>Load More Topics</span>
          <FiChevronDown />
        </button>
      )}
    </div>
  );
}
