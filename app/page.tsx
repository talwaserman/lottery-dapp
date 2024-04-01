import Image from "next/image";
import NavButton from "./shared/NavButton";
import RootLayout from "./layout";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col p-10">
        <NavButton
          location={"ItemList"}
          description={"Go to Items list page"}
        />
        <br></br>
        <h1 className="mb-5">This is the home page</h1>
      </main>
  );
}
