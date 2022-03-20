import { MainApp, Document, Error, PageNotFound } from "./components";
import type { MetaFunction } from "remix";
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
  return (
    <MainApp>
      <Document />
    </MainApp>
  );
}