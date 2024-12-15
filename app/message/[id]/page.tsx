"use client";

import { GetQueryEndpointGetQueryGetRequest } from "@/app/api-client/apis/DefaultApi";
import { QueryModel } from "@/app/api-client/models/QueryModel";
import createApiClient from "@/app/getApiClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Car } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function MessagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const api = createApiClient();
  const [queryItem, setQueryItem] = useState<QueryModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(
    null
  );

  useEffect(() => {
    params.then((resolvedParams) => {
      setUnwrappedParams(resolvedParams);
    });
  }, [params]);

  useEffect(() => {
    if (!unwrappedParams) return;

    const fetchData = async () => {
      const request: GetQueryEndpointGetQueryGetRequest = {
        queryId: unwrappedParams.id,
      };

      api
        .getQueryEndpointGetQueryGet(request)
        .then((data) => {
          console.log(data);
          setQueryItem(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, [unwrappedParams]);

  const parsedQuery = useMemo(() => {
    if (isLoading || !queryItem) {
      return (
        <div className="h-8">
          <Skeleton className="w-full h-full" />
        </div>
      );
    }
    return (
      <Card className="pt-4">
        <CardContent className="space-y-4">
          <p className="font-bold">{queryItem.queryText}</p>
          <p>{queryItem.isComplete ? queryItem.answerText : "Waiting for response..."}</p>
          <p className="text-sm text-gray-500">
            {queryItem.createTime
              ? new Date(queryItem.createTime * 1000).toLocaleString()
              : "-"}
          </p>
        </CardContent>
      </Card>
    );
  }, [queryItem, isLoading]);

  return (
    <div className="relative min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/" passHref>
        <Button
          variant="ghost"
          className="absolute top-4 left-4"
          aria-label="Go back to main page"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-10 gap-12 sm:p-10 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <div className="w-full p-8">
            <h1 className="text-3xl font-bold mb-6">Message Details</h1>
            <div className="space-y-4">{parsedQuery}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
