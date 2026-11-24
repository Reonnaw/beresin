"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Field, inputStyles } from "@/components/ui/field";
import { inlineLinkStyles } from "@/components/ui/text-link";
import { type AuthFormState, signIn, signUp } from "@/features/auth/actions";

type AuthFormProps = {
  mode: "login" | "register";
  next: string;
  initialError?: string;
};

export function AuthForm({ mode, next, initialError }: AuthFormProps) {
  const isRegister = mode === "register";
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    isRegister ? signUp : signIn,
    { error: initialError },
  );
  const switchHref = `${isRegister ? "/login" : "/register"}?next=${encodeURIComponent(next)}`;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      {isRegister && (
        <Field id="fullName" label="Nama lengkap">
          <input id="fullName" name="fullName" autoComplete="name" required className={inputStyles} />
        </Field>
      )}
      <Field id="email" label="Email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputStyles}
        />
      </Field>
      <Field id="password" label="Kata sandi" hint={isRegister ? "Minimal 8 karakter." : undefined}>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          minLength={isRegister ? 8 : undefined}
          required
          aria-describedby={isRegister ? "password-message" : undefined}
          className={inputStyles}
        />
      </Field>

      <div aria-live="polite">
        {state.error && <p className="text-sm text-danger">{state.error}</p>}
        {state.message && <p className="text-sm text-success">{state.message}</p>}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Memproses…" : isRegister ? "Daftar" : "Masuk"}
      </Button>
      <p className="text-sm text-muted">
        {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
        <Link href={switchHref} className={inlineLinkStyles}>
          {isRegister ? "Masuk" : "Daftar"}
        </Link>
      </p>
    </form>
  );
}
