"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNavLinks = ({ role }: { role?: string }) => {
  const ADMIN = "ADMIN";

  const path = usePathname();
  const links = [
    { label: "Dasboard", href: "/", adminOnly: false },
    { label: "Tickets", href: "/tickets", adminOnly: false },
    { label: "Users", href: "/users", adminOnly: true },
  ];
  return (
    <div className="flex items-center gap-2">
      {links
        .filter((link) => !link.adminOnly || role === ADMIN)
        .map((link) => (
          <Link
            id={`nav_${link.label}`}
            href={link.href}
            className={`navbar-link ${
              path == link.href &&
              "cursor-default text-primary/70 hover:text-primary/60"
            }`}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
    </div>
  );
};

export default MainNavLinks;
