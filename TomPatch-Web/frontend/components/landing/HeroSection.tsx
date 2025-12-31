import Image from "next/image";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="h-[84vh] w-full bg-[#171420] pt-2 overflow-hidden">
      <div className="relative w-full h-full flex justify-center items-center px-10 py-15 md:px-20 md:py-15">
        <Image
          src="/hero-section.avif"
          fill
          alt="hero"
          className="object-cover rounded-[3.5rem]"
        />

        <div className="relative bg-white h-full w-full rounded-[3.2rem] flex justify-center items-center overflow-hidden">
          <div className="flex flex-col justify-center items-center px-5 max-w-full">
            <h1
              style={{ wordSpacing: 10 }}
              className="text-center text-5xl md:text-8xl leading-tight md:leading-24 font-extrabold text-[#171420]"
            >
              SECURE FIRMWARE<br></br> DELIVERY
            </h1>
            <div className="flex flex-col gap-10">
              <div>
                <p className="mt-6 text-lg text-[#171420] text-justify max-w-md">
                  One platform to manage your entire release pipeline. Deploy
                  firmware with confidence, ensuring every update reaches your
                  devices safely.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <div className="hidden md:flex">
                  <Button
                    color="#6D57FF"
                    label="Get started"
                    redirect="/login"
                    fontStyle={500}
                  />
                </div>
                <Button
                  color="#34D399"
                  label="Read docs"
                  redirect="/docs"
                  fontStyle={500}
                />
                <Button
                  color="#F59E0B"
                  label="Read blog"
                  redirect="/blog"
                  fontStyle={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
