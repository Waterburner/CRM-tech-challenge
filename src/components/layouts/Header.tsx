import React from "react";

import { Logo } from "src/components/partials/icons/Logo";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header">
      <Logo />
    </header>
  );
};

export default Header;
