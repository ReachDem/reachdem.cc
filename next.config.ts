import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // Médias servis depuis R2 (ou tout CDN) : autorise les hôtes https distants.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default withPayload(nextConfig);
