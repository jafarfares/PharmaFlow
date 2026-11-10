"use client";

import EmailForm from "@/features/auth/login/components/email-form";
import PasswordForm from "@/features/auth/login/components/password-form";
import ButtonForm from "@/features/auth/login/components/button-form";
import { useLogin } from "../hook/useLogin";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

import Logo from "@/features/auth/login/components/logo"
import { LoginSchema } from "@/features/auth/login/Schema/login.schema";
import { toast } from "@/components/ui/toast";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  // Validate form data using Zod
  const result = LoginSchema.safeParse({
    email,
    password,
  });

  // Stop submission if validation fails
  if (!result.success) {
    toast.add({
      type: "error",
      description: result.error.issues[0].message,
      priority: "high",
    });

    return;
  }

  // Send request only when validation succeeds
  mutate(result.data, {
    onSuccess: () => {
      router.replace("/staff");
    },
  });
}


  return (
    <section className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-2xl sm:p-10">
      {/* Logo */}
      <Logo/>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <EmailForm value={email} onChange={setEmail} />
        <PasswordForm value={password} onChange={setPassword} />
        <div className="relative">
          
          <ButtonForm isPending={isPending} />
        </div>
      </form>
    </section>
  );
}
