import Head from "next/head";
import Image from "next/legacy/image";
import { getDirectusClient } from "../lib/directus";
import { formatRelativeTime } from "../utils/format-relative-time";
import { Directus } from "@directus/sdk";
import getConfig from "next/config";
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense(
  'ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0RiXH1cdHJQT2BVVkw='
);

export default function Home({ projects }) {
  return (
    <div className="min-h-full"><SpreadsheetComponent></SpreadsheetComponent></div>
    
    /* <main className="min-h-screen">
      <section className="main-content">
        <div className="container">
        <h1 className="text-9xl font-bold underline">
         Hello world!
         </h1>
          <div className="articles-grid">
            {projects.map((project, index) => (
              <div key={index}>
                {project.name} <span>{project.deadline}</span>
              </div>
            ))}
          </div>
          
          <h1>Do More Project</h1>
        </div>
      </section>
    </main> */
  );
}

export async function getStaticProps() {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
  const { url } = publicRuntimeConfig;
  const directus = new Directus(url);

  const response = await directus.items("Project").readByQuery({
    fields: ["name", "deadline"],
  });

  const formattedProjects = response.data.map((p) => {
    return {
      ...p,
    };
  });
  const [...projects] = formattedProjects;
  return {
    props: {
      projects,
    },
  };
}
