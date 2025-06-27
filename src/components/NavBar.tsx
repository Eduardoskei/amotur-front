import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import Image from "next/image";

type Props = {
  logoOnly?: boolean;
}

export default function NavBar(props: Props) {
  const logoOnly = props.logoOnly ?? false
  if (logoOnly) {
    return (
      <Navbar shouldHideOnScroll
      className="px-3 py-3 bg-white">
        <Image
          className="mr-6 sm:mr-10"
          src={"https://lirp.cdn-website.com/3b6c9aee/dms3rep/multi/opt/logo-amotur+%282%29-1920w.png"}
          alt="amotur-logo"
          width={130}
          height={20}
        />
      </Navbar>
    )
  } else {
    return (
      <Navbar shouldHideOnScroll
      className="p-3 bg-white">
        <Image
          className="mr-6 sm:mr-10"
          src={"https://lirp.cdn-website.com/3b6c9aee/dms3rep/multi/opt/logo-amotur+%282%29-1920w.png"}
          alt="amotur-logo"
          width={130}
          height={20}
        />
        <NavbarContent className="flex gap-4 text-lg sm:gap-20" justify="end">
          <NavbarItem>
            <Link color="foreground" href="#">
              Sobre
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" href="#">
              Entrar
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Cadastrar
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }
}
