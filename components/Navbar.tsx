import Link from 'next/link';
import { buttonVariants } from './ui/button';

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between p-4 w-screen bg-background/30 shadow-md backdrop-blur-md'>
      <h1>Navbar</h1>
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
