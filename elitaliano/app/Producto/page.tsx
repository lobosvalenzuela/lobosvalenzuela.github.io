// app/Producto/page.tsx
import React from "react";
import Producto from "./producto";
import { products } from "./products";

export default function Page() {
  return <Producto products={products} />;
}
