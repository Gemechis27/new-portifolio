import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Project";
import Contact from "@/components/Contact";
import Certificates from "@/components/Certificates";

import Testimonials from "@/components/Testimonials";

export default function Page() {
  return (
    <>
    {/* <Header/> */}
      <Hero />
      <About />
      <Skills/>
       <Projects/> 
       <Certificates/>
       <Testimonials/>
       <Contact/>
    </>
  );
}
