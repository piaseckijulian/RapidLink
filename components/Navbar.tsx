import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-primary px-4 py-4 xs:px-8">
      <Link href="/">
        <h2 className="text-xl font-bold text-white xs:text-2xl sm:text-3xl">
          RapidLink
        </h2>
      </Link>

      <SignedIn>
        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({
              className:
                'hidden !bg-background !font-bold !text-primary hover:!bg-background/80 xs:inline-flex xs:text-lg'
            })}
            href="/urls"
          >
            Your URLs
          </Link>

          <Link
            className={buttonVariants({
              className:
                '!bg-background !font-bold !text-primary hover:!bg-background/80 xs:hidden',
              size: 'icon'
            })}
            href="/urls"
          >
            <LinkIcon />
          </Link>

          <UserButton />
        </div>
      </SignedIn>

      <SignedOut>
        <Link
          className={buttonVariants({
            className:
              '!bg-background !text-lg !font-bold !text-primary hover:!bg-background/80'
          })}
          href="/sign-in"
        >
          Sign In
        </Link>
      </SignedOut>
    </nav>
  );
};

export default Navbar;
