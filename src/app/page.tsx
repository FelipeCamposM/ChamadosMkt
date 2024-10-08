"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import OpenTicket from "./(deslogado)/openTicket/page";



export default function Home() {
  return (
    
    <div>
      <div className="bg-blue-800 flex justify-between items-center h-24 relative">
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <Image
                  src="/logor3.png"
                  alt="Logo"
                  width={70}
                  height={70}
                />
              </Link>
          </div>

          <div className="ml-auto mr-4">
            <div className="list-none gap-2 flex">
              <div>
                <Link
                  href="/login"
                  className="custom-class text-white text-xl bg-blue-800 hover:bg-blue-700 hover:text-white"
                >
                  <User className="inline-block h-6 w-6 mr-2" />
                  Login para Administrador
                </Link>
              </div>
            </div>
          </div>
        </div>
      <OpenTicket></OpenTicket>
    </div>
  );
}
