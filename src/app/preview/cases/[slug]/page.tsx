import { redirect } from "next/navigation";
export { generateStaticParams } from "@/app/cases/[slug]/page";
export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) { redirect("/cases/" + (await params).slug); }
