export default function RememberMe() {
  return (
    <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 accent-primary cursor-pointer"
      />
      Remember me
    </label>
  );
}
