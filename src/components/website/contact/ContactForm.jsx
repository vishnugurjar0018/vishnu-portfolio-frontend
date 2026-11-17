
"use client";

import { useState } from "react";

const INITIAL_FORM = {
  name: "",
  workType: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const whatsappMessage = `
Hello Vishnu! I have a new enquiry from your portfolio website.

Name: ${form.name}
Work Type: ${form.workType}

Message:
${form.message}
    `.trim();

    const whatsappURL = `https://wa.me/918233643514?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
    setForm(INITIAL_FORM);
  }

  const inputClass =
    "w-full rounded-xl border border-purple-100 bg-[#FCFAFF] px-4 py-3.5 text-sm text-[#171321] outline-none transition placeholder:text-gray-400 focus:border-[#7900D8] focus:bg-white focus:ring-4 focus:ring-purple-100";

  return (
    <section className="relative overflow-hidden bg-[#F8F3FF] py-10 sm:py-14 lg:py-16">
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-28 top-10 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute -left-28 bottom-0 h-64 w-64 rounded-full bg-purple-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* LEFT SIDE - LET'S START A CONVERSATION */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#7900D8]">
              <span className="h-2 w-2 rounded-full bg-[#7900D8]" />
              Let's Connect
            </span>

            <h2 className="mt-5 text-[clamp(32px,4vw,48px)] font-extrabold leading-tight tracking-tight text-[#171321]">
              Let's Start a{" "}
              <span className="text-[#7900D8]">
                Conversation.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
              Have an idea, a project, or just want to say hello? Fill out
              the form and let's discuss how we can bring your vision to life.
            </p>

            {/* PROJECT IDEA CARD */}
            <div className="mt-8 rounded-2xl border border-purple-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                  ✨
                </div>

                <div>
                  <h3 className="font-bold text-[#171321]">
                    Have a project idea?
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Let's make something amazing together.
                  </p>
                </div>
              </div>
            </div>

            {/* WHATSAPP CARD */}
            <a
              href="https://wa.me/918233643514"
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                💬
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-[#171321]">
                  Chat on WhatsApp
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  +91 8233643514
                </p>
              </div>

              <span className="text-xl text-green-600">↗</span>
            </a>
          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="rounded-[26px] border border-purple-100 bg-white p-5 shadow-xl shadow-purple-100/60 sm:p-8">

            <div className="mb-7">
              <h3 className="text-2xl font-bold text-[#171321]">
                Send Me a Message
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Fill in the details below to get in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-[#171321]"
                >
                  Your Name *
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  className={inputClass}
                />
              </div>

              {/* WORK TYPE */}
              <div>
                <label
                  htmlFor="contact-work-type"
                  className="mb-2 block text-sm font-semibold text-[#171321]"
                >
                  Select Work Type *
                </label>

                <select
                  id="contact-work-type"
                  name="workType"
                  value={form.workType}
                  onChange={handleChange}
                  required
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="" disabled>
                    Select your project type
                  </option>

                  <option value="Graphic Design Work">
                    Graphic Design Work
                  </option>

                  <option value="Web Development Work">
                    Web Development Work
                  </option>

                  <option value="UI/UX Design Work">
                    UI/UX Design Work
                  </option>

                  <option value="Other / Custom Work">
                    Other / Custom Work
                  </option>
                </select>
              </div>

              {/* CUSTOM MESSAGE */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-[#171321]"
                >
                  Your Message *
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, requirements, budget or ideas..."
                  rows={7}
                  required
                  className={`${inputClass} resize-y leading-7`}
                />
              </div>

              {/* WHATSAPP BUTTON */}
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#7900D8] px-7 py-4 text-base font-bold text-white shadow-lg shadow-purple-200 transition duration-300 hover:-translate-y-1 hover:bg-[#6500B5] hover:shadow-xl"
              >
                Send via WhatsApp

                <span className="text-lg transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </button>

              <p className="text-center text-xs leading-5 text-gray-400">
                You'll be redirected to WhatsApp to send your enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
