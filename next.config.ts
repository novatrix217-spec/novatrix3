import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export HTML statique complet (`next build` génère `out/`, un .html par page) — demandé
  // explicitement par le client, en connaissance de cause que cela désactive les Server
  // Actions (voir src/components/forms/ContactForm.tsx pour la conversion associée) et
  // l'optimiseur d'images par défaut (voir `images.unoptimized` ci-dessous).
  output: "export",
  images: {
    // L'export statique ne supporte pas l'optimiseur d'images par défaut de Next.js (pas de
    // serveur pour re-générer les tailles à la volée). `next/image` est utilisé pour le logo
    // (src/components/layout/Header.tsx) : on désactive l'optimisation plutôt que d'ajouter un
    // loader externe (Cloudinary, etc.) non requis pour ce projet.
    unoptimized: true,
  },
};

export default nextConfig;
