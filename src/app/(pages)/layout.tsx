import DashboardLayout from "@/components/shared/DashboardLayout";
import { getUserProfileServer } from "@/services/server/userServer";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUserProfileServer();
  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
