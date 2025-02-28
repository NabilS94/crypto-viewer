'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from './Icon';

const AppHeader = () => {
  const router = useRouter();
  return (
    <Navbar
      position="sticky"
      className="bg-gradient-to-r from-navy-500 to-navy-900 text-white p-4 z-50 top-0 shadow-2xl flex flex-row border-b-3 border-b-primary/20"
      classNames={{
        wrapper: 'flex justify-center sm:justify-between pb-2 max-w-7xl px-8',
        item: 'hover:bg-white/5 p-3 rounded-2xl'
      }}
    >
      <NavbarBrand
        className="flex flex-col justify-center items-center cursor-pointer flex-grow-0"
        onClick={() => router.push('/')}
      >
        <Icon type={'cryptoViewerLogo'} customSize={{ width: '40px', height: '40px' }} />
        <h1 className="text-xl font-bold">
          <span className="text-primary">Crypto</span>Viewer
        </h1>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Coins
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link aria-current="page" href="/markets">
            Markets
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppHeader;
