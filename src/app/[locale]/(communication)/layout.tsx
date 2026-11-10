import Page from "@/layout/Sidebar/index/page";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Page>{children}</Page> ;
}