export default function Features() {
  return (
    <section className="h-screen w-screen bg-[#f6f6f6] rounded-[3.7rem] py-16 px-10 flex flex-col">
      <p className="text-2xl md:text-4xl font-semibold text-[#171420] mb-6">
        MANAGE YOUR FLEET
      </p>

      <div className="flex flex-col gap-5 w-full flex-1">
        <div className="flex flex-3 md:flex-2 flex-col md:flex-row gap-5 md:gap-6 w-full">
          <div className="flex-1 bg-[#FFE635] rounded-3xl p-6"></div>
          <div className="flex-1 bg-[#FF9902] rounded-3xl p-6"></div>
          <div className="flex-1 bg-[#F094FF] rounded-3xl p-6"></div>
        </div>

        <div className="flex flex-1 w-full">
          <div className="flex-1 bg-[#00CC92] rounded-3xl p-6"></div>
        </div>
      </div>
    </section>
  );
}
