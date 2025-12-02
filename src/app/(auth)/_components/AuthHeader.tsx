export default function AuthHeader({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-bold text-primary">{title}</h1>
      <p className="text-xs lg:text-sm text-muted">{desc}</p>
    </>
  );
}
