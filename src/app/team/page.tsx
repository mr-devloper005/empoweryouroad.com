import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";

export const revalidate = 3;

export const generateMetadata = () => buildTaskMetadata("org");

export default async function TeamPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  return <TaskListPage task="org" category={resolvedParams?.category} />;
}
