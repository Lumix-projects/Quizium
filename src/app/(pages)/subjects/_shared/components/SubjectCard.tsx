"use client";
import { useState } from "react";
import { Subject } from "@/types";
import { FiBook, FiArrowRight, FiClock, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const [imageError, setImageError] = useState(false);

  const subjectId = subject.id || subject._id;

  return (
    <div className="group relative bg-gradient-to-br from-card via-card to-card/80 border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm ${
            subject.status === "available"
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-yellow-100 text-yellow-700 border-yellow-200"
          }`}
        >
          {subject.status === "available" ? (
            <>
              <FiCheckCircle className="w-3.5 h-3.5" />
              <span>Available</span>
            </>
          ) : (
            <>
              <FiClock className="w-3.5 h-3.5" />
              <span>Upcoming</span>
            </>
          )}
        </div>
      </div>

      {/* Image Section */}
      <Link
        href={
          subject.status === "available" && subjectId
            ? `/subjects/${subjectId}`
            : "#"
        }
        className={`block h-40 bg-gradient-to-br from-primary/10 via-muted/20 to-muted/10 relative overflow-hidden ${
          subject.status === "available" ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={(e) => {
          if (subject.status !== "available") {
            e.preventDefault();
          }
        }}
      >
        {subject.image && !imageError ? (
          <>
            <Image
              src={subject.image}
              alt={subject.title || "Subject Image"}
              fill
              className={`object-cover transition-transform duration-500 ${
                subject.status === "available" ? "group-hover:scale-110" : ""
              }`}
              onError={() => setImageError(true)}
              unoptimized
            />
            {/* Overlay gradient for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Dim overlay for upcoming subjects */}
            {subject.status === "upcoming" && (
              <div className="absolute inset-0 bg-black/30" />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-muted/20 to-muted/10">
            <FiBook className="text-5xl text-primary/40 transition-all duration-300 group-hover:scale-110 group-hover:text-primary/60" />
            {subject.status === "upcoming" && (
              <div className="absolute inset-0 bg-black/20" />
            )}
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-6 relative">
        <Link
          href={
            subject.status === "available" && subjectId
              ? `/subjects/${subjectId}`
              : "#"
          }
          className="block mb-4"
          onClick={(e) => {
            if (subject.status !== "available") {
              e.preventDefault();
            }
          }}
        >
          <h3
            className={`text-lg font-bold mb-2 line-clamp-1 transition-colors duration-200 ${
              subject.status === "available"
                ? "text-foreground group-hover:text-primary"
                : "text-muted-foreground"
            }`}
            title={subject.title}
          >
            {subject.title}
          </h3>
          <p
            className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed"
            title={subject.description}
          >
            {subject.description || "No description available."}
          </p>
        </Link>

        {/* Action button */}
        {subject.status === "available" ? (
          <Link
            href={subjectId ? `/subjects/${subjectId}` : "/"}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/20 text-primary font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200 group/button"
          >
            <span className="group-hover:text-white transition-all duration-300">
              Explore Subject
            </span>
            <FiArrowRight className="text-lg group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
          </Link>
        ) : (
          <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 font-semibold text-sm cursor-not-allowed">
            <span>Coming Soon</span>
            <FiClock className="text-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
