import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex justify-center items-center w-dvw h-dvh bg-black font-[family-name:var(--font-geist-sans)]">
      <Image
        src={`/assets/dog.jpg`}
        alt="Dog Adoption"
        className="w-full h-full"
        width={640}
        height={640}
        priority
      />
      <div className="absolute top-[20%] flex items-center gap-[10em]">
        <span className="flex flex-col justify-start">
          <h2 className="text-[4rem] font-bold">WILL YOU ADOPT ME?</h2>
          <h3 className="text-xs font-bold ml-3">Pawsibly?</h3>
        </span>

        <Link
          className="w-[9em] h-[4em] text-xl font-bold bg-green-400 border border-green-500 rounded-3xl flex justify-center items-center hover:bg-green-500 hover:shadow-md"
          href={"/login"}
        >
          Adopt Today
        </Link>
      </div>
    </section>
  );
}
