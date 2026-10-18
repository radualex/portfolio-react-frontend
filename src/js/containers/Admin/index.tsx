import React from "react";
import AdminBar from "@/components/AdminBar";
import AccessPanel from "@/containers/Admin/AccessPanel";
import AvailabilityPanel from "@/containers/Admin/AvailabilityPanel";
import InboxPanel from "@/containers/Admin/InboxPanel";
import ProjectsPanel from "@/containers/Admin/ProjectsPanel";
import usePageMeta from "@/hooks/usePageMeta";
import styles from "./styles.module.scss";

const Admin: React.FunctionComponent = () => {
  /* noindex travels with the document; robots.txt is only a request. */
  usePageMeta({
    title: "Admin — Radu Stoica",
    noindex: true,
  });

  return (
    <React.Fragment>
      <AdminBar />
      <main id="content" className={styles.main}>
        <AvailabilityPanel />
        <ProjectsPanel />
        <InboxPanel />
        <AccessPanel />
      </main>
    </React.Fragment>
  );
};

export default Admin;
