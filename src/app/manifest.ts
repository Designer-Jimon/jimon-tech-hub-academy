import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jimon Tech Hub Academy",
    short_name: "JTH Academy",
    description:
      "Empowering Africans Through AI, Digital Skills, and Innovation.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B1F4D",
    icons: [
      { src: "/images/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { src: "/images/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
      {
        src: "/images/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}

