"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../assets/logo.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const navItems = [
  { label: "Library", href: "/" },
  { label: "Add New", href: "/books/new" },
];

type NavbarProps = {
  userId?: string | null;
};

const Navbar = ({ userId }: NavbarProps) => {
  const pathName = usePathname();
  const { user } = useUser();
  return (
    <header
      data-user-id={userId ?? undefined}
      className="w-full fixed z-50 bg-[var(--bg-primary)]"
    >
      <div className="wrapper flex py-4 justify-between items-center">
        <Link href={"/"} className="flex gap-0.5 items-center">
          <Image
            src={logo}
            alt="Bookify"
            className="rounded-full"
            width={42}
            height={32}
          />
          <span className="logo-text">Bookified</span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="flex gap-8 items-center">
            {navItems.map(({ label, href }) => {
              const isActive =
                pathName === href ||
                (href !== "/" && pathName.startsWith(href));

              return (
                <Link
                  href={href}
                  key={label}
                  className={cn(
                    "nav-link-base",
                    isActive
                      ? "nav-link-active"
                      : "text-black hover:opacity-70",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex gap-7.5 items-center">
            <Show when="signed-out">
              <SignInButton>
                <button className="rounded-md border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="rounded-md bg-slate-950 px-4 py-2 text-sm text-white transition hover:bg-slate-800">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="nav-user-link">
                <UserButton />
                {user?.firstName && (
                  <Link href={"/subscriptions"} className="nav-user-name">
                    {user.firstName}
                  </Link>
                )}
              </div>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
