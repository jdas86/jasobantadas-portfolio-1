import { resumeData } from "@/data/resume-data";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section id="contact" className="section-pad py-20 pb-28 md:pb-20">
      <div className="container-shell rounded-[2rem] bg-blue-900 border border-blue-700 p-8 text-white">
        <div className="max-w-3xl">
          <div className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Contact</div>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Let’s connect if you're modernising your data platform, building a Lakehouse, or exploring GenAI solutions.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/90">
            {resumeData.extra[17]}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={`mailto:${resumeData.basics.email}`}>
              <Button size="lg">Email Me</Button>
            </a>
            <a href={`https://${resumeData.basics.website}`}>
              <Button size="lg">Visit Website</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
