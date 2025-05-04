"use client";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Chip } from "primereact/chip";
import { Skeleton } from "primereact/skeleton";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1>Next.js + PrimeReact + TailwindCSS</h1>
      <div>
        <h2>Demo app showing PrimeReact + Tailwind CSS in unstyled mode</h2>
      </div>
      <div className="card">
        <Button
          icon="pi pi-plus"
          className="mr-2"
          label="Increment"
          onClick={() => setCount((count) => count + 1)}
        ></Button>
        <InputText value={count.toString()} />
      </div>
      <p className="read-the-docs">
        Click on the Next and React logos to learn more
      </p>
      <Badge value="12" severity="warning"></Badge>
      <Chip label="Thriller" removable />
      <Chip label="Google" icon="pi pi-google" />
      <div>
        <h5>Rounded</h5>
        <Skeleton className="mb-2" borderRadius="16px"></Skeleton>
        <Skeleton width="10rem" className="mb-2" borderRadius="16px"></Skeleton>
        <Skeleton width="5rem" borderRadius="16px" className="mb-2"></Skeleton>
        <Skeleton height="2rem" className="mb-2" borderRadius="16px"></Skeleton>
        <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
      </div>
    </main>
  );
}
