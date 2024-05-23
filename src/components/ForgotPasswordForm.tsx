import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  })
});

const ForgotPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isForgotPasswordSuccess, setIsForgotPasswordSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {forgotPassword} = useAuth()


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMessage(null)
    setIsForgotPasswordSuccess(false)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(() => {

    forgotPassword(values.email)?.then(res => {
        if (res?.message == "success") {
                    setIsForgotPasswordSuccess(true)
                } else {
                    setErrorMessage('Server Error!')
                }
    })



      })
  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {isForgotPasswordSuccess? 
        <Alert variant="default">
      <AlertDescription>
      A password reset email has been sent.
      </AlertDescription>
    </Alert> : <></>}
        {errorMessage? 
        <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
      {errorMessage}
      </AlertDescription>
    </Alert> : <></>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input placeholder="Email" {...field} disabled={isForgotPasswordSuccess} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending || isForgotPasswordSuccess}>
          Submit {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
