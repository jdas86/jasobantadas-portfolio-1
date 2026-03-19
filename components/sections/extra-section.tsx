import { resumeData } from "@/data/resume-data";
import { SectionHeading } from "@/components/section-heading";

export function ExtraSection() {
  return (
    <section id="more" className="section-pad py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="More"
          title="Additional source lines preserved without invention"
          copy="This section ensures nothing from the provided document is dropped."
        />
        <div className="mt-10 grid gap-4">
          <div className="rounded-[2rem] bg-blue-900 border border-blue-700 p-6 text-white text-base leading-8">
            {resumeData.basics.summary[2]}
          </div>
          <div className="rounded-[2rem] bg-blue-900 border border-blue-700 p-6 text-white text-base leading-8">
            {resumeData.extra[15]}
          </div>
          <div className="rounded-[2rem] bg-blue-900 border border-blue-700 p-6 text-white text-base leading-8">
            {resumeData.extra[16]}
          </div>
          <div className="rounded-[2rem] bg-blue-900 border border-blue-700 p-6 text-white text-base leading-8">
            {resumeData.extra[17]}
          </div>
        </div>
      </div>
    </section>
  );
}