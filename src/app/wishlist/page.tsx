"use client";

import Link from "next/link";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { FaTrash, FaShoppingCart, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
    toast.success("Removed from Wishlist");
  };

  const handleMoveToCart = (item: any) => {
    addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        color: item.color,
        size: item.size
    });
    removeFromWishlist(item.id);
    toast.success("Moved to Cart");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#F3F4F6] to-[#E5E7EB]">
      <Navbar />

      {/* Main content area grows to fill space */}
      <main className="flex-1 py-16 px-4 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-[#000000] mb-12 text-center">
          Your Wishlist
        </h1>

        {wishlistCount === 0 ? (
          <div className="flex flex-col items-center justify-center px-4">
            <p className="text-2xl md:text-3xl text-[#4B5563] mb-6 font-semibold">
              Your wishlist is empty
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#4B5563] to-[#000000] text-white font-semibold rounded-xl hover:from-[#000000] hover:to-[#000000]/70 transition-all duration-300 shadow-lg"
            >
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#F3F4F6] flex flex-col transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative h-80 w-full rounded-t-2xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-b from-white to-[#FFFFFF]/50">
                  <h3 className="text-[#000000] font-semibold line-clamp-2">
                    {product.title}
                  </h3>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#4B5563] to-[#000000] text-white font-semibold rounded-xl hover:from-[#000000] hover:to-[#4B5563] transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <FaShoppingCart className="text-white" />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#000000] to-[#CD853F] text-white font-semibold rounded-xl hover:from-[#CD853F] hover:to-[#000000] transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <FaHeart className="text-white" />
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
