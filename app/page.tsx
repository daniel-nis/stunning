import Image from "next/image";
import Link from "next/link"
//import { Input } from "@/components/ui/input"
//import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 border-gray-200 dark:border-gray-800">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center justify-between h-14">
            <Link className="flex items-center justify-center" href="#">
              <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Link className="flex items-center space-x-2 text-sm font-medium" href="#">
                  Home
                </Link>
                <Link className="flex items-center space-x-2 text-sm font-medium" href="#">
                  Explore
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12">
          <div className="container flex flex-col items-center justify-center gap-2 px-4 text-center md:gap-4 md:px-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Discover and save ideas</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explore new trends, find inspiration, and organize your projects.
              </p>
            </div>
            <form className="flex w-full max-w-sm flex-col gap-2 min-[400px]:flex-row items-center mx-auto sm:gap-4 lg:gap-6">
              {/* <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
              <Button type="submit">Sign Up</Button> */}
            </form>
          </div>
        </section>
        <section className="w-full py-6 md:py-12">
          <div className="container grid items-stretch justify-center gap-4 px-4 md:px-6">
            <div className="grid grid-cols-2 items-stretch justify-center gap-4 md:grid-cols-3">
              <Link className="mx-auto flex w-full items-center p-4" href="#">
                <Image
                  src="/placeholder.svg"
                  width="300"
                  height="200"
                  alt="Cover image"
                  // className="aspect-video overflow-hidden rounded-lg object-cover object-center"
                />
              </Link>
              <Link className="mx-auto flex w-full items-center p-4" href="#">
                <Image
                  alt="Cover image"
                  className="aspect-video overflow-hidden rounded-lg object-cover object-center"
                  height="200"
                  src="/placeholder.svg"
                  width="300"
                />
              </Link>
              <Link className="mx-auto flex w-full items-center p-4" href="#">
                <Image
                  alt="Cover image"
                  className="aspect-video overflow-hidden rounded-lg object-cover object-center"
                  height="200"
                  src="/placeholder.svg"
                  width="300"
                />
              </Link>
              <Link className="mx-auto flex w-full items-center p-4" href="#">
                <Image
                  alt="Cover image"
                  className="aspect-video overflow-hidden rounded-lg object-cover object-center"
                  height="200"
                  src="/placeholder.svg"
                  width="300"
                />
              </Link>
              <Link className="mx-auto flex w-full items-center p-4" href="#">
                <Image
                  alt="Cover image"
                  className="aspect-video overflow-hidden rounded-lg object-cover object-center"
                  height="200"
                  src="/placeholder.svg"
                  width="300"
                />
              </Link>
              <Link className="mx-auto flex w-full items-center p-4" href="#">
                <Image
                  alt="Cover image"
                  className="aspect-video overflow-hidden rounded-lg object-cover object-center"
                  height="200"
                  src="/placeholder.svg"
                  width="300"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
