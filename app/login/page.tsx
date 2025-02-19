"use client";

import { loginAction } from "@/actions/auth";
import { Button, Group, Text, TextInput, Title } from "@mantine/core";
import { useActionState } from "react";

export default function Login() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className="mt-8 w-full flex flex-col items-center justify-center">
      <form
        action={action}
        className="bg-gray-100 rounded-lg flex flex-col gap-4 p-8 pt-6 w-4/5 sm:w-3/5 md:w-2/5 md:max-w-sm"
      >
        <Title className="" order={3}>
          Login
        </Title>
        <div>
          <TextInput label="Name" name="name" type="text" />
          {state?.errors?.name && (
            <Text className="text-red-500 text-sm mt-1">
              {state.errors.name}
            </Text>
          )}
        </div>
        <div>
          <TextInput label="Email" name="email" type="email" />
          {state?.errors?.email && (
            <Text className="text-red-500 text-sm mt-1">
              {state.errors.email}
            </Text>
          )}
        </div>
        <Group justify="flex-end" mt="md">
          <Button
            aria-disabled={pending}
            disabled={pending}
            loading={pending}
            type="submit"
          >
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
}
