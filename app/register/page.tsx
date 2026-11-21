import type { Metadata } from "next";

import { AuthPage } from "@/features/auth/components/auth-page";

export const metadata: Metadata = { title: "Daftar" };

export default function RegisterPage(props: PageProps<"/register">) {
  return <AuthPage mode="register" searchParams={props.searchParams} />;
}
