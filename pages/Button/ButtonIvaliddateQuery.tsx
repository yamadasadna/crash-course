// pages/docs.tsx
import { Button } from "@nextui-org/button";
import React from "react";
import { useQueryClient } from "react-query";

export default function ButtonInvalidateQuery() {
  const queryClient = useQueryClient();
  return (
    <>
      <Button
        className="ml-4"
        onClick={() => queryClient.invalidateQueries(["fetchTableData"])}
        color="primary"
      >
        Invalidate Queries
      </Button>
    </>
  );
}
