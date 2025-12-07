import DashboardLayout from "@/components/shared/DashboardLayout";
import { getUserProfileCached } from "@/services/server/userServer";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUserProfileCached();
  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
