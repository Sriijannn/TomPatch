import Image from "next/image";
import LoginForm from "@/components/auth/login-form";

export default function Signin() {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <Image src="/auth-bg.png" alt="" fill className="object-cover" priority />

      <div className="z-10 relative w-full max-w-md">
        <div className="bg-[#f6f6f6] p-6 sm:p-10 rounded-3xl md:rounded-[3.7rem] shadow-2xl w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
