import { MainApp, Document, Error, PageNotFound } from "./components";
import { MetaFunction, json, useLoaderData } from "remix";
import styles from "~/styles/all.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "GOV.UK - What do you want to do ?",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  return json({
    ENV: {
      LIMIT_ADD_SPECIES: process.env.LIMIT_ADD_SPECIES
    },
  });
}

export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <MainApp>
      <Error />
    </MainApp>
  );
}

export function CatchBoundary() {
  return (
    <MainApp>
      <PageNotFound />
    </MainApp>
  );
}

export default function App() {
  const data = useLoaderData();
  return (
    <MainApp applicationConfig={data.ENV}>
      <Document />
    </MainApp>
  );
}