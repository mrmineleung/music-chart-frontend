import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  token: z.string(),
  new_password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirm_new_password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.new_password === data.confirm_new_password, {
  message: "Passwords not match",
  path: ["confirm_new_password"],
});

interface ResetPasswordFormProps {
  token: string
}

const ResetPasswordForm = ({token}: ResetPasswordFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isUpdatePasswordSuccess, setIsUpdatePasswordSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {resetPassword} = useAuth()

  // const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: token,
      new_password: "",
      confirm_new_password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUpdatePasswordSuccess(false)
    setErrorMessage(null)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    startTransition(() => {

    resetPassword(values.token, values.new_password)?.then(res => {
        if (res?.message == "success") {
          setIsUpdatePasswordSuccess(true)
                } else if (res?.message == "failed") {
                  setErrorMessage("Reset password failed!")
                } else {
                  setErrorMessage(res?.message || "Reset password failed!")
                }
                return
    })

      })
  }

  return (
    
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isUpdatePasswordSuccess? 
          <Alert>
        <AlertDescription>
        Password reset successful!
        </AlertDescription>
      </Alert>
         : <></>}
        {errorMessage? 
        <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
      {errorMessage}
      </AlertDescription>
    </Alert> : <></>}
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
                <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your new password" type="password" {...field} disabled={isUpdatePasswordSuccess} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_new_password"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your new password again" type="password" {...field} disabled={isUpdatePasswordSuccess} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} defaultValue={token} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" className="w-full" disabled={isPending || isUpdatePasswordSuccess}>
          Submit {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
