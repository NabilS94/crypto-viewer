// check https://www.heroui.com/docs/guide/routing for more details
"use client";

import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Error from "./error";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function Providers({ children }: ProvidersProps) {
  const router = useRouter();
  return (
    <ErrorBoundary
      errorComponent={({ error, reset }) => {
        return <Error error={error} reset={reset} />;
      }}
    >
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
