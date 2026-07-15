"use client";

import { useState } from "react";

type FormData = {
  name: string;
  institution: string;
  role: string;
  contact: string;
  problem: string;
};

const initialForm: FormData = {
  name: "",
  institution: "",
  role: "",
  contact: "",
  problem: "",
};

function FormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  name: keyof FormData;
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

export default function RequestAccessFormSection() {
  const [form, setForm] = useState<FormData>(initialForm);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="bg-[#F4F0EA] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-[100px]">
      <div className="mx-auto grid w-full max-w-[1488px] grid-cols-1 gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
        <div className="relative flex flex-col gap-8 pl-8">
          <div className="absolute bottom-0 left-0 top-0 w-[20px] bg-[#C6A02C]" />

          <p className="font-inter text-sm font-medium uppercase text-[#111]">
            What happens
          </p>

          <h2 className="font-eb-garamond text-[clamp(2rem,4vw,56px)] font-semibold italic leading-[1.1] text-[#111]">
            Request a briefing.
            <br />
            We come to you.
          </h2>

          <div className="flex flex-col gap-3">
            <p className="font-inter text-base font-normal leading-[1.6] text-[#111]">
              Held in confidence. Read by a person, not a queue.
            </p>
            <div className="h-px w-full bg-[#111]/[0.12]" />
          </div>
        </div>

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

          <button
            type="submit"
            className="mt-4 flex h-14 w-full items-center justify-center bg-[#C6A02C] font-inter text-sm font-semibold uppercase tracking-[2px] text-white transition-opacity hover:opacity-85"
          >
            Send request
          </button>
        </form>
      </div>
    </section>
  );
}
