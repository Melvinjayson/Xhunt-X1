import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Route not found</CardTitle>
          <CardDescription>This part of X-hunt has not been rebuilt yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button render={<Link href="/" />}>Go home</Button>
        </CardContent>
      </Card>
    </main>
  );
}
