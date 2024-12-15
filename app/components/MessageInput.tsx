"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import createApiClient from "../getApiClient";
import { SubmitQueryEndpointSubmitQueryPostRequest } from "../api-client/apis/DefaultApi";
import { SubmitQueryRequest } from "../api-client/models/SubmitQueryRequest";
import { useRouter } from "next/navigation";
import { getSessionId } from "../getUserId";

export function MessageInput() {
  const router = useRouter();

  const api = createApiClient();
  const userId = getSessionId();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsSubmitting(true);

      const submitQuery: SubmitQueryRequest = {
        queryText: message,
        userId: userId,
      };
      const query: SubmitQueryEndpointSubmitQueryPostRequest = {
        submitQueryRequest: submitQuery,
      };
      api
        .submitQueryEndpointSubmitQueryPost(query)
        .then((data) => {
          console.log(data);
          router.push(`/message/${data.queryId}`);
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow"
      />
      <Button type="submit" disabled={isSubmitting} className="ml-auto">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Send
      </Button>
    </form>
  );
}
