"use client";

import { Eye, EyeClosed, ArrowRight, CircleAlert, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeSwitcher } from "@/components/theme-switcher";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Lgu } from "@/types/lgus";

const NAME_MIN = 2;
const NAME_MAX = 54;
const nameRegex = /^[\p{L}][\p{L}\s.'-]*[\p{L}]$/u;

const normalizeSpaces = (s: string | undefined) => {
  if (s === undefined) return "";
  return s.replace(/\s+/g, " ").trim();
};

const titleCase = (value: string | undefined) => {
  if (value === undefined) return "";
  return value.toLowerCase().replace(/\b\p{L}/gu, (char) => char.toUpperCase());
};

const formSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(NAME_MIN, "First name is empty or too short.")
      .max(NAME_MAX, "First name is too long.")
      .regex(nameRegex, "First name contains invalid characters.")
      .transform(normalizeSpaces)
      .transform(titleCase),
    middle_name: z
      .string()
      .trim()
      .max(NAME_MAX, "Middle name is too long.")
      .transform((v) => (v === "" ? undefined : v))
      .transform(normalizeSpaces)
      .transform(titleCase)
      .optional()
      .refine((v) => v === "" || v === undefined || v.length >= NAME_MIN, {
        message:
          "Middle initial is not accepted. You must enter your middle name.",
      })
      .refine((v) => v === "" || v === undefined || nameRegex.test(v), {
        message: "Middle name contains invalid characters.",
      }),
    last_name: z
      .string()
      .trim()
      .min(NAME_MIN, "Last name is empty or too short.")
      .max(NAME_MAX, "Last name is too long.")
      .regex(nameRegex, "Last name contains invalid characters.")
      .transform(normalizeSpaces)
      .transform(titleCase),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address."
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(72, "Password cannot exceed 72 characters.")
      .regex(/[a-z]/, "Password must include a lowercase letter.")
      .regex(/[A-Z]/, "Password must include an uppercase letter.")
      .regex(/\d/, "Password must include a number.")
      .regex(/[^A-Za-z0-9]/, "Password must include a special character.")
      .refine((v) => !/\s/.test(v), "Password must not contain spaces."),
    confirm_password: z.string().min(1, "Please confirm your password."),
    lgu: z.uuid("Please select a valid LGU."),
    terms_and_conditions: z.boolean().refine((v) => v === true, {
      message: "You must accept the Terms and Conditions.",
    }),
    data_privacy_policy: z.boolean().refine((v) => v === true, {
      message: "You must accept the Data Privacy Policy.",
    }),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirm_password"],
        message: "Passwords do not match.",
      });
    }
  });

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [lgus, setLgus] = useState<Lgu[]>([]);
  const [lgusLoading, setLgusLoading] = useState(false);
  const [lgusError, setLgusError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      lgu: "",
      terms_and_conditions: false,
      data_privacy_policy: false,
    },
  });

  useEffect(() => {
    setLgusLoading(true);
    setLgusError(null);

    const supabase = createClient();

    const fetchLgus = async () => {
      try {
        const { data, error } = await supabase.from("lgus").select("*");
        if (error) throw error;
        setLgus(data);
      } catch (error: unknown) {
        setLgusError(
          error instanceof Error ? error.message : "An error occured"
        );
      } finally {
        setLgusLoading(false);
      }
    };

    fetchLgus();
    if (lgus.length === 0) setLgusError("Error: Failed to fetch LGUs.");
  }, [lgus.length]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setError(null);
    setShowError(false);
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.first_name,
            middle_name: data.middle_name ?? "",
            last_name: data.last_name,
            role: "IT Administrator",
            lgu_id: data.lgu,
          },
        },
      });
      if (error) throw error;
      router.push("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occured");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div {...props} className="w-full flex flex-col gap-10">
      <Card className="w-full">
        <CardHeader>
          <div className={showError ? "w-full mb-4" : "hidden"}>
            <Alert className="flex justify-between items-center bg-red-200 dark:bg-inherit text-red-800 border-red-800 border-solid border-2 px-2 py-1">
              <div className="flex flex-row gap-4 items-center">
                <CircleAlert size={24} className="" />
                <div className="flex flex-col md:flex-row gap-0 md:gap-2">
                  <AlertTitle className="font-semibold">
                    Sign Up Failed:
                  </AlertTitle>
                  <AlertDescription className="text-red-900">
                    {error ?? "An error occured."}
                  </AlertDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                className="hover:bg-red-300 hover:text-red-200"
                onClick={() => setShowError(false)}
              >
                <X />
              </Button>
            </Alert>
          </div>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="mb-4">
              <FieldGroup className="flex flex-col md:flex-row gap-4">
                <Controller
                  name="first_name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-1">
                      <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Jose"
                        autoComplete="off"
                        className=""
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="middle_name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-1">
                      <FieldLabel htmlFor={field.name}>Middle Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Protacio"
                        autoComplete="off"
                        className=""
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="last_name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-1">
                      <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Rizal Mercado y Alonso Realonda"
                        autoComplete="off"
                        className=""
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldGroup className="flex flex-col md:flex-row gap-4">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-1">
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="jose.rizal@email.com"
                        autoComplete="off"
                        className=""
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-1">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Password"
                          autoComplete="off"
                          className=""
                          type={showPassword ? "text" : "password"}
                        />
                        <InputGroupAddon align={"inline-end"}>
                          <InputGroupButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <Eye /> : <EyeClosed />}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="confirm_password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-1">
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Re-enter Password"
                          autoComplete="off"
                          className=""
                          type={showConfirmPassword ? "text" : "password"}
                        />
                        <InputGroupAddon align={"inline-end"}>
                          <InputGroupButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? <Eye /> : <EyeClosed />}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <FieldGroup className="flex flex-col md:flex-row gap-4">
                <Controller
                  name="lgu"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="flex-1">
                      <FieldLabel htmlFor={field.name}>LGU</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={lgusError !== null}
                      >
                        <SelectTrigger
                          id="signup-form-select-lgu"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue
                            placeholder={
                              lgusLoading ? (
                                <div className="flex flex-row gap-2 items-center">
                                  <Spinner />
                                  Loading LGUS
                                </div>
                              ) : (
                                "Select LGU"
                              )
                            }
                          />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectGroup>
                            <SelectLabel>Select LGU</SelectLabel>
                            {lgus.map((lgu) => (
                              <SelectItem
                                key={lgu.id}
                                value={lgu.id.toString()}
                              >
                                {lgu.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <p className="text-sm text-destructive">
                        {!lgusLoading && lgusError}
                      </p>
                    </Field>
                  )}
                />
                <div className="flex-1">
                  <FieldGroup>
                    <Controller
                      name="terms_and_conditions"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="flex-1"
                          orientation={"horizontal"}
                        >
                          <Checkbox
                            id={field.name}
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel htmlFor={field.name}>
                            <p>
                              I agree to the CyberSafePH{" "}
                              <span className="underline hover:cursor-pointer">
                                Terms and Conditions
                              </span>
                            </p>
                          </FieldLabel>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="data_privacy_policy"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="flex-1"
                          orientation={"horizontal"}
                        >
                          <Checkbox
                            id={field.name}
                            name={field.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FieldLabel htmlFor={field.name}>
                            <p>
                              I agree to the CyberSafePH{" "}
                              <span className="underline hover:cursor-pointer">
                                Data Privacy Policy
                              </span>
                            </p>
                          </FieldLabel>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </div>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-col-reverse gap-4 md:flex-row md:gap-6 md:justify-end md:items-center">
            <p className="text-sm text-muted-foreground text-center md:text-start">
              Already have an account?{" "}
              <Link
                href={"/auth/login"}
                className="underline hover:cursor-pointer"
              >
                Log In
              </Link>
            </p>
            <Button form="signup-form" type="submit" size={"lg"}>
              {isLoading ? <Spinner /> : "Sign Up"}
              <ArrowRight />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className="w-full flex justify-center">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
