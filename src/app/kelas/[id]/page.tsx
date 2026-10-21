'use client';

import { useParams } from "next/navigation";

export default function Id() {
  const { id } = useParams();

  return (
    <div>
      <h1>Welcome to the kelas {id}</h1>
      <h2>This is a subheading</h2>
    </div>
  );
}
