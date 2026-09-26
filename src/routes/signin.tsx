import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — MetricFlow" },
      {
        name: "description",
        content: "Sign in to your MetricFlow workspace to view revenue, subscription and campaign analytics.",
      },
      { property: "og:title", content: "Sign in — MetricFlow" },
      { property: "og:description", content: "Access your MetricFlow analytics workspace." },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const { signIn, user, signOut } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter your name and a valid work email.");
      return;
    }
    signIn({
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || "Your workspace",
    });
    toast.success("Signed in", { description: "Welcome to your MetricFlow workspace." });
    navigate({ to: "/dashboard" });
  }

  return (
    <main className="mx-auto flex max-w-md flex-col justify-center px-4 py-20">
      <Card>
        <CardHeader>
          <CardTitle>{user ? "You're signed in" : "Sign in to MetricFlow"}</CardTitle>
          <CardDescription>
            {user
              ? `Active session for ${user.email}.`
              : "Use your work details to open your analytics workspace."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => navigate({ to: "/dashboard" })}>
                Go to dashboard
              </Button>
              <Button variant="outline" onClick={signOut}>
                Sign out
              </Button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company (optional)</Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company Inc."
                  autoComplete="organization"
                />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button type="submit" className="w-full">
                Continue to dashboard
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
