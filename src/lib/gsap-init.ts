import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const registerGSAP = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
};
