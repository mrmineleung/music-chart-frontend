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
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name can not be empty.",
  }).max(20, {
    message: "More than 20 characters",
  }),
  description: z.string().max(20, {
    message: "More than 20 characters",
  }).optional(),
});

interface CreatePlaylistFormProps {
  handleCreateMyPlaylist: (name: string, description: string) => Promise<void>;
handleFetchMyPlaylist: () => Promise<null | undefined>;
}

const CreatePlaylistForm = ({
  handleCreateMyPlaylist,
handleFetchMyPlaylist,
}: CreatePlaylistFormProps) => {
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      handleCreateMyPlaylist(values.name, values.description ?? "").then(
        handleFetchMyPlaylist
      );
    });
  }

  return (
    <Form {...form}>
      <FormLabel>Create Playlist</FormLabel>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center"></div>
              <FormControl>
                <Textarea placeholder="Description (Optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Create{" "}
          {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePlaylistForm;
