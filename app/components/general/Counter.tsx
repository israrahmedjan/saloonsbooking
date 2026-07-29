"use client";
import { useCartStore } from "@/store/useCartStore";





export default function Counter() {
  const { cart,addToCart } = useCartStore();

  return (
    <>
      {/* <div className="border-red-500 border"><h1 className="flex text-sm flex-col ">{cart && (
            <div>{JSON.stringify(cart,null,2)}</div>
      )}</h1>
    <button
  onClick={() =>
    addToCart({
      id: 1,
      name: "iPhone 16",
      price: 250000,
    })
  }
>
  Add To Cart
</button>
    </div> */}
    </>
  );
}