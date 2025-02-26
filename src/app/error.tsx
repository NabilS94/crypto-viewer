"use client"; // Error boundaries must be Client Components

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Error = ({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col h-screen mx-auto text-white justify-center items-center">
      <h1>Something went wrong!</h1>
      <Button
        className="bg-white text-navy-900 px-4 py-2 rounded-xl mt-2"
        onPress={() => router.replace("/")}
      >
        Try again
      </Button>
    </div>
  );
};

export default Error;
