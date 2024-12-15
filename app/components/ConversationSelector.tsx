"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { ListQueryEndpointListQueryGetRequest } from "../api-client/apis/DefaultApi";
import { QueryModel } from "../api-client/models/QueryModel";
import createApiClient from "../getApiClient";
import { getSessionId } from "../getUserId";

export function ConversationSelector() {
  const api = createApiClient();
  const userId = getSessionId();

  const [conversations, setConversations] = useState<QueryModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getConversations = async () => {
      const request: ListQueryEndpointListQueryGetRequest = {
        userId: userId,
      };
      api
        .listQueryEndpointListQueryGet(request)
        .then((data) => {
          console.log(data);
          setIsLoading(false);
          setConversations(data);
        })
        .catch((error) => console.error(error));
    };
    getConversations();
  }, []);

  const conversationElement = useMemo(() => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      );
    }

    return conversations.map((conversation) => (
      <div key={conversation.queryId}>
        <Link href={`/message/${conversation.queryId}`} passHref>
          <Button variant="outline" className="w-full justify-start">
            {conversation.queryText}
          </Button>
        </Link>
      </div>
    ));
  }, [conversations, isLoading]);

  return <div className="space-y-2">{conversationElement}</div>;
}
