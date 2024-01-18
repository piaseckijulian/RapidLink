import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="xs:px-10 flex items-center justify-between bg-blue-700 px-4 py-4 sm:px-20 ">
      <Link href="/">
        <h2 className="xs:text-2xl text-xl font-bold text-white sm:text-3xl">
          RapidLink
        </h2>
      </Link>

      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <Button className="xs:text-lg bg-white text-base font-bold text-blue-700 hover:bg-slate-100">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </SignedOut>
    </nav>
  );
};

export default Navbar;
