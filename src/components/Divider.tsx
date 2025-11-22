export function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center my-3">
      <span className="flex-1 border-t border-gray-300"></span>
      {children && (
        <span className="mx-2 text-sm text-primary px-2">{children}</span>
      )}
      <span className="flex-1 border-t border-gray-300"></span>
    </div>
  );
}
