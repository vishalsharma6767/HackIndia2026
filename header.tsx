import React from 'react';
import { Button } from '../ui/button';

const RakshakLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-7 w-7 mr-2.5 text-primary"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <RakshakLogo />
          <span className="font-bold font-headline text-lg tracking-wider">RAKSHAK</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
                <Button variant="ghost">Dashboard</Button>
                <Button variant="ghost">History</Button>
                <Button variant="ghost">Settings</Button>
            </nav>
        </div>
      </div>
    </header>
  );
}
