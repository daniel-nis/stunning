"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useAuth } from "@/utils/useAuth";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { signUp, signIn, signOut } = useAuth();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    const { error } = await signIn(email, password);

    if (error) {
      console.error("Error signing in:", error);
    }

    setIsLoading(false);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or sign up
          </span>
        </div>
      </div>
      <Link href="/signup" passHref>
        <Button variant="outline" type="button" disabled={isLoading} className="w-full">
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create an account
        </Button>
      </Link>
    </div>
  );
}

// "use client";
// import * as React from "react";
// import { cn } from "@/lib/utils";
// import { Icons } from "@/components/ui/icons";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/utils/useAuth";
// import { useToast } from "./ui/use-toast";

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
//   isSignUp?: boolean;
// }

// export function UserAuthForm({
//   className,
//   isSignUp = false,
//   ...props
// }: UserAuthFormProps) {
//   const [isLoading, setIsLoading] = React.useState(false);
//   const { signUp, signIn } = useAuth();
//   const { toast } = useToast();

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);
//     const email = (event.target as HTMLFormElement).email.value;
//     const password = (event.target as HTMLFormElement).password.value;

//     try {
//       if (isSignUp) {
//         const { error } = await signUp(email, password);
//         if (error) {
//           toast({
//             title: "Error signing up",
//             description: error.message,
//             variant: "destructive",
//           });
//         } else {
//           toast({
//             title: "Sign up successful",
//             description: "You have been signed up and logged in.",
//           });
//         }
//       } else {
//         const { error } = await signIn(email, password);
//         if (error) {
//           toast({
//             title: "Error signing in",
//             description: error.message,
//             variant: "destructive",
//           });
//         } else {
//           toast({
//             title: "Sign in successful",
//             description: "You have been logged in.",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast({
//         title: "An error occurred",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <form className={cn(className)} onSubmit={onSubmit} {...props}>
//       <div className="grid gap-6">
//         <Label htmlFor="email">Email</Label>
//         <Input id="email" type="email" placeholder="john@example.com" required />
//         <Label htmlFor="password">Password</Label>
//         <Input id="password" type="password" required />
//       </div>
//       <Button
//         type="submit"
//         className="mt-6"
//         aria-label={isSignUp ? "Sign Up" : "Sign In"}
//       >
//         {isSignUp ? "Sign Up" : "Sign In"} with Email
//       </Button>

//       {/* 
//         Or continue with

//         {isLoading ? (
//           <Button className="mt-4" isLoading variant="outline">
//             <Icons.loader2 className="animate-spin" />
//           </Button>
//         ) : (
//           <Button className="mt-4" variant="outline">
//             <Icons.gitHub className="mr-2 h-4 w-4" />
//             GitHub
//           </Button>
//         )}{" "}
//       */}
//     </form>
//   );
// }