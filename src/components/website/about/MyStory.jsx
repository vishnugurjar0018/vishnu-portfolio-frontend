import Image from "next/image";

export default function MyStory() {
  return (
    <section className="pt-16 pb-0 sm:pt-20 sm:pb-0 lg:pt-24 lg:pb-0">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">

        {/* LEFT - STORY HEADING AND IMAGE */}
        <div>
          <span className="text-sm font-bold uppercase tracking-[2px] text-[#7900D8]">
            My Journey
          </span>

          <h2 className="mt-3 text-[clamp(32px,3.5vw,48px)] font-bold leading-tight text-[#171321]">
            A Little About
            <span className="block text-[#7900D8]">
              My Story.
            </span>
          </h2>

          {/* Profile Image */}
          <div className="relative mt-8 max-w-[430px]">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-[26px] border-2 border-purple-200" />

            <div className="relative overflow-hidden rounded-[26px] bg-[#EEE5FA] p-3 shadow-lg shadow-purple-100">
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-[20px] bg-[#E7D7FA]">
                <Image
                  src="/images/profile.png"
                  alt="Vishnu Gurjar - My Story"
                  fill
                  sizes="(max-width: 768px) 90vw, 430px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - STORY CONTENT */}
        <div className="space-y-5 text-base leading-8 text-gray-600 sm:text-lg">

          <p>
            Hello! I'm Vishnu Gurjar, a Creative Designer and Full Stack
            Developer passionate about transforming ideas into impactful
            digital experiences. My journey combines creativity,
            continuous learning and technology.
          </p>

          <p>
            I started my graphic design journey as a self-taught designer,
            learning through YouTube tutorials and practicing independently.
            With dedication and creativity, I developed my skills in
            designing engaging graphics, marketing materials and brand
            identities.
          </p>

          <p>
            Over time, I got the opportunity to work on graphic design
            projects for companies and organizations like
            <span className="font-semibold text-[#171321]">
              {" "}Wakefit, Soraya Jewels, K2 Fashion, Indian Navy
            </span>
            {" "}and others. These experiences helped me understand
            professional design requirements and deliver creative solutions.
          </p>

          <p>
            Along with graphic design, I developed an interest in web
            development. To strengthen my technical skills, I completed
            a MERN Stack Development course from
            <span className="font-semibold text-[#171321]">
              {" "}WsCube Tech.
            </span>
            {" "}There, I learned modern web development technologies
            and how to build full-stack web applications.
          </p>

          <p>
            Today, I combine my design knowledge with development skills
            to create visually appealing, responsive and functional
            digital experiences. I believe in continuous learning,
            improving my craft and bringing every idea to life.
          </p>

        </div>
      </div>
    </section>
  );
}