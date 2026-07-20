"use client";

import { useState } from "react";
import { FadeIn, MotionButton, WordReveal } from "@/components/ui/text-reveal";

type ContactFormFields = {
  name: string;
  institution: string;
  role: string;
  contact: string;
  problem: string;
};

const initialForm: ContactFormFields = {
  name: "",
  institution: "",
  role: "",
  contact: "",
  problem: "",
};

const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/innovate@thehedgecollective.com";

function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  name: keyof ContactFormFields;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  multiline?: boolean;
}) {
  const inputClassName =
    "w-full border-0 border-b border-[#111]/[0.12] bg-transparent font-inter text-xl font-normal text-[#111] placeholder:text-[#111]/35 focus:border-[#111]/40 focus:outline-none";

  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={name}
        className="font-inter text-base font-medium uppercase tracking-[2px] text-[#111]"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={8}
          className={`${inputClassName} resize-none pt-4`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputClassName} h-12`}
        />
      )}
    </div>
  );
}

type Status = "idle" | "sending" | "success" | "error";

export default function RequestAccessFormSection() {
  const [form, setForm] = useState<ContactFormFields>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.contact.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in at least your name and a way to reach you.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const payload = new FormData();
    payload.append("name", form.name.trim());
    payload.append("institution", form.institution.trim());
    payload.append("role", form.role.trim());
    payload.append("contact", form.contact.trim());
    payload.append("problem", form.problem.trim());
    payload.append("_subject", "New Website Contact Form Submission");
    payload.append("_captcha", "false");
    payload.append("_template", "table");

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      const result = (await response.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;

      if (response.ok && result && result.success !== false) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
        setErrorMessage(
          result?.message || "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <section className="bg-[#F4F0EA] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto grid w-full max-w-[1488px] grid-cols-1 gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
        <div className="relative flex flex-col gap-8 pl-8">
          <div className="absolute bottom-0 left-0 top-0 w-[20px] bg-[#C6A02C]" />

          <p className="font-inter text-sm font-medium uppercase text-[#111]">
            What happens
          </p>

          <WordReveal
            as="h2"
            className="font-eb-garamond text-[clamp(2rem,4vw,56px)] font-semibold italic leading-[1.1] text-[#111]"
            segments={[{ text: "Request a briefing.\nWe come to you." }]}
          />

          <div className="flex flex-col gap-3">
            <p className="font-inter text-base font-normal leading-[1.6] text-[#111]">
              Held in confidence. Read by a person, not a queue.
            </p>
            <div className="h-px w-full bg-[#111]/[0.12]" />
          </div>
        </div>

        <FadeIn as="div">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
            <FormField
              label="Name"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
            />
            <FormField
              label="State or institution"
              name="institution"
              placeholder="Government / Institution"
              value={form.institution}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
            <FormField
              label="Role"
              name="role"
              placeholder="Role / Title"
              value={form.role}
              onChange={handleChange}
            />
            <FormField
              label="A secure way to reach you"
              name="contact"
              placeholder="Email or secure contact"
              value={form.contact}
              onChange={handleChange}
            />
          </div>

          <FormField
            label="The problem in one line"
            name="problem"
            placeholder="If you can say it, say it here."
            value={form.problem}
            onChange={handleChange}
            multiline
          />

          {status === "success" && (
            <p
              role="status"
              className="border border-[#111]/15 bg-[#FBFAF7] px-5 py-4 font-inter text-base text-[#111]"
            >
              Request received. Held in confidence — we will reach you through
              the contact you provided.
            </p>
          )}

          {status === "error" && errorMessage && (
            <p
              role="alert"
              className="border border-[#B3261E]/30 bg-[#B3261E]/5 px-5 py-4 font-inter text-base text-[#B3261E]"
            >
              {errorMessage}
            </p>
          )}

          <MotionButton
            type="submit"
            disabled={status === "sending"}
            hoverScale={1.02}
            tapScale={0.9}
            className="mt-4 flex h-14 w-full items-center justify-center bg-[#C6A02C] font-inter text-sm font-semibold uppercase tracking-[2px] text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send request"}
          </MotionButton>
        </form>
        </FadeIn>
      </div>
    </section>
  );
}
