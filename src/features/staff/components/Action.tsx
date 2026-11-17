"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useDeleteStaff } from "../hooks/staffDelete";
import { useRouter } from "@/i18n/navigation";

interface ActionProps {
  id: number;
}

export default function Action({ id }: ActionProps) {
  const router = useRouter();
  const { mutate: deleteStaff, isPending: isDeleting } = useDeleteStaff();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/staff/${id}/edit`)}
        aria-label="Edit staff"
      >
        <Pencil className="size-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        disabled={isDeleting}
        onClick={() => deleteStaff(id)}
        aria-label="Delete staff"
      >
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  );
}
