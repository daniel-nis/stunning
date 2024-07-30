"use client"

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
//import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import stunning_logo from "@/app/assets/stunning_logo.png"

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
  // {
  //   href: "/submit",
  //   label: "Submit",
  // },
//   {
//     href: "#TBD",
//     label: "TBD",
//   },
//   {
//     href: "#TBD",
//     label: "TBD",
//   },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <Image src={stunning_logo} alt="Stunning Logo" width={80} height={80} className="mr-2" />
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            {/* TODO */}
            {/* <ModeToggle /> */}

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  {/* <span className="sr-only">Menu Icon</span> */}
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    <span className="flex items-center justify-center">
                        <Image src={stunning_logo} alt="Stunning Logo" width={80} height={80} className="mr-2" />
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    href="https://forms.gle/U8GiukNz3KaiFXDs7"
                    target="Submit"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    Submit
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                🧑‍🎨
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <a
              href="https://forms.gle/U8GiukNz3KaiFXDs7"
              target="Submit"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
                {/* TODO */}
              {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
              Submit
            </a>

                {/* TODO */}
            {/* <ModeToggle /> */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};