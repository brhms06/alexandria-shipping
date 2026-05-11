"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function LiveChat() {
  const pathname = usePathname();

  // Do not show the chat widget on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <Script id="tawk-chat" strategy="lazyOnload">
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/69fdf45906a7a01c33949e5d/1jo405148';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  );
}
