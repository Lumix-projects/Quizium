"use client";

import { Search, Loader2, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useSearchBar from "@/hooks/useSearchBar";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  onBlur?: () => void;
}

export default function SearchBar({
  className,
  autoFocus,
  onBlur,
}: SearchBarProps) {
  const {
    searchRef,
    inputRef,
    searchQuery,
    loading,
    cleanQuery,
    showDropdown,
    hasResults,
    filteredSubjects,
    filteredExams,
    handleInputChange,
    handleKeyDown,
    handleSubjectClick,
    handleExamClick,
    setSearchQuery,
    setIsOpen,
  } = useSearchBar(autoFocus);

  return (
    <div
      ref={searchRef}
      className={cn(
        "w-1/2 relative hidden lg:flex justify-center group",
        className
      )}
    >
      {/* Search Icon Label */}
      <label
        htmlFor="searchInput"
        className="bg-background rounded-s-full text-muted-foreground px-4 border-2 border-input-border border-e-0 group-focus-within:border-primary duration-300 flex items-center cursor-text"
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Search size={18} />
        )}
      </label>

      {/* Search Input */}
      <input
        ref={inputRef}
        type="text"
        id="searchInput"
        placeholder="Search Subjects & Exams..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        onBlur={onBlur}
        className="w-2/3 focus:w-full duration-300 border-s-0 border-e-0 py-2.5 bg-background text-foreground placeholder-muted-foreground outline-none border-y-2 border-input-border focus:border-primary group-focus-within:border-primary"
      />

      {/* Clear Button */}
      <button
        onClick={() => {
          setSearchQuery("");
          setIsOpen(false);
          inputRef.current?.focus();
        }}
        disabled={!cleanQuery}
        className="bg-background cursor-pointer rounded-e-full text-muted-foreground px-4 border-2 border-input-border border-s-0 group-focus-within:border-primary duration-300 flex items-center hover:text-foreground transition-colors disabled:cursor-text"
      >
        {cleanQuery && <X size={18} />}
      </button>

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {hasResults ? (
            <div className="py-2">
              {/* Subjects Section */}
              {filteredSubjects.length > 0 && (
                <div>
                  <h5 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Subjects
                  </h5>
                  <ul>
                    {filteredSubjects.slice(0, 4).map((subject) => (
                      <li key={subject.id || subject._id}>
                        <button
                          onClick={() =>
                            handleSubjectClick(subject.id || subject._id!)
                          }
                          className="w-full px-4 py-2 cursor-pointer hover:bg-card-hover transition-colors duration-200 flex items-center gap-3 text-left group/item"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-muted/20">
                            <Image
                              src={subject.image || "/subject_fallback.webp"}
                              alt={subject.title}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-foreground group-hover/item:text-primary transition-colors duration-200 truncate">
                              {subject.title}
                            </h4>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Divider if both exist */}
              {filteredSubjects.length > 0 && filteredExams.length > 0 && (
                <div className="h-px bg-border my-2 mx-4" />
              )}

              {/* Exams Section */}
              {filteredExams.length > 0 && (
                <div>
                  <h5 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Exams
                  </h5>
                  <ul>
                    {filteredExams.slice(0, 4).map((exam) => (
                      <li key={exam._id}>
                        <button
                          onClick={() => handleExamClick(exam._id)}
                          className="w-full px-4 py-2 hover:bg-card-hover transition-colors duration-200 flex items-center gap-3 text-left group/item"
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                            <Search size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-foreground group-hover/item:text-primary transition-colors duration-200 truncate">
                              {exam.title}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {exam.difficulty} • {exam.duration} mins
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 px-4 text-center text-muted-foreground">
              <Search size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
