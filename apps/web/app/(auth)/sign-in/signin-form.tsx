"use client";
import { formOptions, useForm } from "@tanstack/react-form";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SignInWithGoogle from "@/components/app/buttons/sign-in-with-google";
import { signIn } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import type { AnyFieldApi } from "@tanstack/react-form";

export default function SigninForm({ redirectURL }: { redirectURL?: string }) {
  const { data } = useSession();
  if (data?.user) {
    redirect(redirectURL || "/");
  }

  function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
      <>
        {field.state.meta.isTouched && field.state.meta.errors.length ? (
          <em className="text-xs text-red-300 font-light">
            {field.state.meta.errors.join(", ")}
          </em>
        ) : null}
        {/* {field.state.meta.isValidating ? 'Validating...' : null} */}
      </>
    );
  }

  const formOpts = formOptions({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      try {
        const { email, password } = value;
        await signIn.email(
          {
            email,
            password,
            // todo: change this callback url
            callbackURL: decodeURIComponent(redirectURL || "/"),
          },
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSuccess: (ctx) => {
              toast.success("Welcome Back! You're Signed In!");
            },
            onError: (ctx) => {
              // replace this with toast
              toast.error(ctx.error.message);
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    },
  });

  const inputClasses: string =
    "shadow-none bg-neutral-50/30 border focus-visible:ring-0";
  return (
    <div className="rounded-xl bg-white">
      <div className="text-2xl md:text-3xl my-3 font-bold">
        <h2 className="-mx-1">Welcome Back</h2>
        <p className="text-xs text-neutral-400 font-light">
          New User?{" "}
          <Link
            href={
              redirectURL
                ? `/sign-up?redirectURL=${encodeURIComponent(redirectURL)}`
                : "/sign-up"
            }
            className="text-dodger-blue-700 hover:text-dodger-blue-600 hover:underline hover:underline-offset-3 duration-150 font-normal transition ease-in-out"
          >
            Sign up
          </Link>
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-1"
      >
        <div>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) {
                  return "Email is required";
                }
                return undefined;
              },
              // asynchronous validations
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return value.includes("error") && "Email must be valid";
              },
            }}
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              return (
                <>
                  <Label className="text-sm text-neutral-800" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@medssist.com"
                    autoComplete="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={inputClasses}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          ></form.Field>
        </div>
        <div>
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Password required"
                  : value.length < 6
                    ? "Password must contain at least 6 characters"
                    : undefined,
              // asynchronous validations
              onChangeAsyncDebounceMs: 300,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in password'
                );
              },
            }}
            // eslint-disable-next-line react/no-children-prop
            children={(field) => {
              return (
                <>
                  <Label
                    className="text-sm text-neutral-800"
                    htmlFor={field.name}
                  >
                    Password
                  </Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    placeholder="******"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={inputClasses}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          ></form.Field>
        </div>
        <div className="w-full flex justify-center pt-2">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            // eslint-disable-next-line react/no-children-prop
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                className="bg-dodger-blue-600/90 cursor-pointer text-white rounded-lg border-t-2 border-b-2 border-t-dodger-blue-500/35 border-b-dodger-blue-700/70 font-normal w-full text-base hover:bg-dodger-blue-600/90 hover:opacity-90 transition-all duration-150 ease-in-out shadow-none"
                // handling better-auth submission logic above
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            )}
          />
        </div>
        <div className="flex items-center gap-3 py-1 w-full">
          <div className="border-b border-neutral-300 flex-1 block"></div>
          <p className="text-neutral-500 font-light text-xs">
            OR CONTINUE WITH
          </p>
          <div className="border-b border-neutral-300 flex-1 block"></div>
        </div>
      </form>
      <SignInWithGoogle redirectURL={redirectURL} />
    </div>
  );
}
