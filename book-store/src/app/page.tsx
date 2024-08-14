import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { inherits } from "util";

export default function Home() {
  return (
    <main>
      <div>
        <Image
          className={clsx(
            "mx-auto my-24 sm:w-32 w-[140px] h-[90px] md:w-[400px] md:h-[260px]"
          )}
          src="/Logo.png"
          width={400}
          height={260}
          alt="Home welcome logo"
        />
      </div>
      <div className="flex flex-col gap-4 mx-auto px-12 py-4 items-center justify-center ">
        <Link href="/login">
          <p className="text-white text-center bg-orange w-48 md:w-96 py-3 md:py-5 rounded-lg">
            Login
          </p>
        </Link>
        <Link href="/home">
          <p className="py-5 blue">Skip</p>
        </Link>
      </div>
    </main>
  );
}
