"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useTopicDetails } from "@/hooks/useSubject";
import { FiBook, FiAward, FiList } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import BackBtn from "@/components/shared/BackBtn";

export default function TopicDetailsPage() {
  const { id, topicId } = useParams();
  const [imageError, setImageError] = useState(false);
  const { topic } = useTopicDetails(id as string, topicId as string);

  if (!topic) {
    return null;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back Button */}

      <BackBtn backTo="Subject" />

      {/* Hero Section */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="relative h-64 md:h-80 bg-muted/20">
          {topic.image && !imageError ? (
            <Image
              src={topic.image}
              alt={topic.title || "Topic Image"}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/10 text-muted">
              <FiBook className="text-6xl opacity-20" />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 md:p-8 text-white w-full">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {topic.title}
              </h1>
              <div className="flex items-center gap-4 text-sm md:text-base opacity-90">
                <span className="flex items-center gap-1">
                  <FiList />
                  Topic Details
                </span>
                {topic.tags && topic.tags.length > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex gap-2">
                      {topic.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-3">
                  About this Topic
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {topic.description ||
                    "No description available for this topic."}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href={`/quizzes?topic=${topic.id}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20"
                >
                  <FiAward className="text-xl" />
                  <span>Start Quiz for this Topic</span>
                </Link>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 h-fit border border-border/50">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FiBook className="text-primary" />
                Quick Info
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground text-sm">Status</span>
                  <span className="font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded text-xs">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground text-sm">Created</span>
                  <span className="font-medium text-foreground text-sm">
                    {new Date(topic.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
