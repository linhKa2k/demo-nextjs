import { AppSidebar } from "../(common)/sidebar/page";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}