import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useExams, useSubjects } from "./useSubject";

export default function useSearchBar(autoFocus = false) {
  // Hooks
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { subjects, loading: subjectsLoading } = useSubjects();
  const { exams, loading: examsLoading } = useExams();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Loading State
  const loading = subjectsLoading || examsLoading;

  // Filter subjects based on debounced search query
  const filteredSubjects = (subjects || []).filter((subject) =>
    subject.title?.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
  );

  // Filter exams based on debounced search query
  const filteredExams = (exams || []).filter((exam) =>
    exam.title?.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
  );

  // Show dropdown only when there's input and results
  const cleanQuery = searchQuery.trim().length > 0;
  const showDropdown = isOpen && cleanQuery;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus input when autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle subject selection
  const handleSubjectClick = (subjectId: string) => {
    setSearchQuery("");
    setIsOpen(false);
    router.push(`/subjects/${subjectId}`);
  };

  // Handle exam selection
  const handleExamClick = (examId: string) => {
    setSearchQuery("");
    setIsOpen(false);
    router.push(`/quizzes/${examId}`);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const hasResults = filteredSubjects.length > 0 || filteredExams.length > 0;

  return {
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
  };
}
