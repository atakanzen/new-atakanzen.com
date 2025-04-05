import { IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

const nudica = localFont({ src: "./fonts/nudica-medium-webfont.ttf" });
const ibmPlexMono = IBM_Plex_Mono({ weight: "500", subsets: ["latin"] });

export { ibmPlexMono, nudica };
