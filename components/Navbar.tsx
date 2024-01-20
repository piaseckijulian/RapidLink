import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-700 px-4 py-4 xs:px-10 sm:px-20 ">
      <Link href="/">
        <h2 className="text-xl font-bold text-white xs:text-2xl sm:text-3xl">
          RapidLink
        </h2>
      </Link>

      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <Link
          className={`${buttonVariants()} bg-white !font-bold !text-blue-700 hover:bg-slate-100 xs:text-xl`}
          href="/sign-in"
        >
          Sign In
        </Link>
      </SignedOut>
    </nav>
  );
};

export default Navbar;
