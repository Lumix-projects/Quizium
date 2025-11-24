export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="animate-pulse space-y-6">
        <div className="h-64 bg-muted rounded-xl" />
        <div className="h-6 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="h-40 bg-muted rounded-xl" />
          <div className="h-40 bg-muted rounded-xl" />
          <div className="h-40 bg-muted rounded-xl" />
        </div>
      </div>
    </div>
  );
}
