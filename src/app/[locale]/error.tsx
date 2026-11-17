"use client";

import Error from "@/components/shared/error/Error"
type StaffErrorProps = {
  message: string;
};

export default function StaffError({ message }: StaffErrorProps) {
  return <Error message={message}/>
}
