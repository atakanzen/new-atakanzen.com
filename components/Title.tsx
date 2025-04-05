import { ibmPlexMono } from "@/fonts";
import GlitchText from "./GlitchText";

const Title = () => {
  return (
    <div
      className={`${ibmPlexMono.className} flex flex-col items-center select-none`}
    >
      <h1 className={`text-3xl md:text-8xl tracking-tighter`}>atakan zengin</h1>
      <GlitchText />
    </div>
  );
};

export default Title;
