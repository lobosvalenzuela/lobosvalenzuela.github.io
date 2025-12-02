// app/Producto/products.ts
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;       // ruta relativa bajo /public (sin dominio)
  descripcion: string;
}
export const products: Producto[] = [
  { id: 1,  nombre: "Pizza Margarita",            precio: 7990,  imagen: "/IMG/pizza.jpg",                 descripcion: "pizza con salsa de tomate, mozzarella fresca y albahaca." },
  { id: 2,  nombre: "Pizza Pepperoni",            precio: 8990,  imagen: "/IMG/peperoni.jpg",              descripcion: "pizza con salsa de tomate,pepperoni y mozzarella." },
  { id: 3,  nombre: "Lasagna clasica",            precio: 10990, imagen: "/IMG/lasagna.jpg",               descripcion: "lasagna con carne molida, salsa bechamel y queso gratinado." },
  { id: 4,  nombre: "Espirales a la bolognesa",   precio: 9990,  imagen: "/IMG/espirales.jpg",             descripcion: "espirales con salsa de carne, tomate y queso parmesano." },
  { id: 5,  nombre: "Spaghetti con albondigas",   precio: 7990,  imagen: "/IMG/spaghetti-albondigas.jpg",  descripcion: "spaghetti con albondigas en salsa de tomate y albahaca." },
  { id: 6,  nombre: "Fetuccine Alfredo",          precio: 9990,  imagen: "/IMG/alfredo.jpg",               descripcion: "fetuccine con salsa cremosa de queso parmesano y mantequilla." },
  { id: 7,  nombre: "Pasta al pesto",             precio: 9990,  imagen: "/IMG/pesto.jpg",                 descripcion: "pasta al pesto con albahaca, piñones y queso parmesano." },
  { id: 8,  nombre: "Focaccia",                   precio: 5990,  imagen: "/IMG/focaccia.jpg",              descripcion: "focaccia con romero, sal gruesa y aceite de oliva." },
  { id: 9,  nombre: "Pasta alla puttanesca",      precio: 9990,  imagen: "/IMG/puttanesca.jpg",            descripcion: "pasta alla putanesca con salsa de tomate, aceitunas, alcaparras y anchoas." },
  { id: 10, nombre: "raviolles",                  precio: 10990, imagen: "/IMG/ravioles.jpg",              descripcion: "ravioles rellenos de ricota y espinaca con salsa de tomate y albahaca." },
  { id: 11, nombre: "ensalada caprese",           precio: 8990,  imagen: "/IMG/ensalada_caprese.jpg",      descripcion: "ensalada caprese con tomate, mozzarella fresca y albahaca." },
  { id: 12, nombre: "ensalada césar",             precio: 7990,  imagen: "/IMG/ensalada_cesar.jpg",        descripcion: "ensalada césar con lechuga romana, crutones y aderezo césar." }
];
