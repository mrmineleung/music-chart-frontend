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

const formSchema = z.object({
  // password: z.string().min(8, {
  //   message: "Password must be at least 8 characters.",
  // }),
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

const UpdatePasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isUpdatePasswordSuccess, setIsUpdatePasswordSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {currentUser, updatePassword} = useAuth()

  // const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // password: "",
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

    updatePassword(currentUser?.username || "", currentUser?.email || "", values.new_password)?.then(res => {
        if (res?.message == "success") {
          setIsUpdatePasswordSuccess(true)
                } else if (res?.message == "failed") {
                  setErrorMessage("Update password failed!")
                } else {
                  setErrorMessage(res?.message || "Update password failed!")
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
        Password updated!
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
        {/* <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
                <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
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
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Update
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
