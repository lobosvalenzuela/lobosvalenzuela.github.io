"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CartBadge from "./CartBadge"; // ← mismo nivel

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => (pathname === href ? "active" : "");

  return (
    <nav className="navbar navbar-expand-lg custom-navbar navbar-dark sticky-top">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link className="navbar-brand d-flex align-items-center" href="/">
            {/* Cambia el nombre EXACTO del archivo si es distinto */}
            <Image src="/IMG/logoItaliano.png" alt="El Italiano" width={70} height={70} className="me-2" />
            <span className="brandNav">El Italiano</span>
          </Link>

          <div className="d-flex align-items-center gap-3">
            {/* Desktop: único con id */}
            <Link href="/Carrito" className="icon-cart d-none d-lg-flex align-items-center text-white text-decoration-none">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
              </svg>
              <CartBadge withId /> {/* ← único id="icon-cart-quantity" */}
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item"><Link className={`nav-link ${isActive("/")}`} href="/">Home</Link></li>
            <li className="nav-item"><Link className={`nav-link ${isActive("/Registro")}`} href="/Registro">Registro</Link></li>
            <li className="nav-item"><Link className={`nav-link ${isActive("/Login")}`} href="/Login">Login</Link></li>
            <li className="nav-item"><Link className={`nav-link ${isActive("/Producto")}`} href="/Producto">Productos</Link></li>
            <li className="nav-item"><Link className={`nav-link ${isActive("/Contacto")}`} href="/Contacto">Contacto</Link></li>
            <li className="nav-item">
            <Link className={`nav-link ${isActive("/Ofertas")}`} href="/Ofertas">Ofertas</Link></li>
            <li className="nav-item d-lg-none mt-2">
              <Link href="/Carrito" className="icon-cart d-flex align-items-center text-white text-decoration-none">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                </svg>
                <CartBadge />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
