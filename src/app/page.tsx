import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={`${styles.page} bg-gray-500 min-h-screen`}>
      <main className={`${styles.main} text-center py-10`}>
        <Image
          className={`${styles.logo} mx-auto`}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="text-lg text-gray-800 mt-6">
          <li>
            Get started by editing{" "}
            <code className="bg-red-500 text-black px-1 rounded block">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="mt-2">Save and see your changes instantly.</li>
        </ol>

        <div className={`${styles.ctas} mt-8 flex gap-4 justify-center`}>
          <a
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="inline mr-2"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="border-t mt-10 py-6 text-sm flex justify-center gap-6 text-gray-500">
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
            className="inline mr-1"
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
            className="inline mr-1"
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            className="inline mr-1"
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
