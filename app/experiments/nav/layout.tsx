import React from "react";
import Counter from "./components/counter/Counter";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Counter label="layout" />
      <nav>
        <Link href={"a"}>A</Link>
        <Link href={"b"}>B</Link>
        <Link href={"a?x=1"}>A?x=1</Link>
        <Link href={"a?x=2"}>A?x=2</Link>
        <a href="b">B - raw `a`</a>
      </nav>
      {children}
    </>
  );
};

export default Layout;
