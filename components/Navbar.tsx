import Link from 'next/link';
import { buttonVariants } from './ui/button';

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between p-4 w-screen bg-background/30 shadow-md backdrop-blur-md'>
      <Link
        href='/'
        className='cursor-pointer'
      >
        <h1 className='fancy uppercase'>Product Manager</h1>
      </Link>
      <section>
        <Link
          href={'/products'}
          className={buttonVariants({ variant: 'outline' })}
        >
          Manage Products
        </Link>
      </section>
      <section className='flex items-center'>
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href={'/login'}
        >
          Login
        </Link>
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href={'/register'}
        >
          Register
        </Link>
      </section>
    </nav>
  );
}
