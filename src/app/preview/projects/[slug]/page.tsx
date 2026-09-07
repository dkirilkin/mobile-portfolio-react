import { redirect } from "next/navigation";
export { generateStaticParams } from "@/app/projects/[slug]/page";
export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) { redirect("/projects/" + (await params).slug); }
