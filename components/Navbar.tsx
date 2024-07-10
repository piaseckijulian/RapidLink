import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-primary px-4 xs:px-8 py-4">
      <Link href="/">
        <h2 className="font-bold text-white text-xl xs:text-2xl sm:text-3xl">
          RapidLink
        </h2>
      </Link>

      <SignedIn>
        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({
              variant: "white",
              className: "xs:inline-flex hidden",
            })}
            href="/links"
          >
            Your links
          </Link>

          <Link
            className={buttonVariants({
              className: "xs:hidden",
              size: "icon",
              variant: "white",
            })}
            href="/links"
          >
            <LinkIcon size={24} />
          </Link>

          <UserButton />
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="white">Sign In</Button>
        </SignInButton>
      </SignedOut>
    </nav>
  )
}

export default Navbar
