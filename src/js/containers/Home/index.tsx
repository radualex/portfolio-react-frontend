import React from "react";
import PageFooter from "@/components/PageFooter";
import SkipLink from "@/components/SkipLink";
import TopNav from "@/components/TopNav";
import usePageMeta from "@/hooks/usePageMeta";
import Capabilities from "@/containers/Home/Capabilities";
import ClosingCta from "@/containers/Home/ClosingCta";
import Experience from "@/containers/Home/Experience";
import Hero from "@/containers/Home/Hero";
import Projects from "@/containers/Home/Projects";
import References from "@/containers/Home/References";
import TrackRecord from "@/containers/Home/TrackRecord";

const Home: React.FunctionComponent = () => {
  usePageMeta({
    title: "Radu Stoica — Freelance software engineer, Amsterdam",
    description:
      "Freelance React and TypeScript engineer in Amsterdam. Ten years of production frontend work for ASML, Cytosmart, Yellowtail, ING and Wärtsilä.",
  });

  return (
    <React.Fragment>
      <SkipLink />
      <TopNav />
      <main id="content">
        <Hero />
        <Capabilities />
        <TrackRecord />
        <Experience />
        <Projects />
        <References />
        <ClosingCta />
      </main>
      <PageFooter />
    </React.Fragment>
  );
};

export default Home;
