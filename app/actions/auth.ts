"use server";
import { LoginFormSchema, LoginFormState } from "@/lib/definitions";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_HOST = process.env.API_HOST;

export async function deleteCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("fetch-access-token");
}

export async function loginAction(_: LoginFormState, formData: FormData) {
  const result = LoginFormSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const response = await fetch(`${API_HOST}/auth/login`, {
    body: JSON.stringify(result.data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const setCookieHeader = response.headers.get("set-cookie");
  if (!setCookieHeader) {
    return { error: "No cookie received from server" };
  }

  const parsedCookie = parse(setCookieHeader);
  let accessToken;
  for (const key of Object.keys(parsedCookie)) {
    if (key.match(/fetch-access-token/)) {
      accessToken = parsedCookie[key];
      break;
    }
  }

  if (!accessToken) {
    return { error: "No access token found in cookie" };
  }

  const cookieStore = await cookies();
  cookieStore.set("fetch-access-token", accessToken, {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
  });

  redirect("/");
}

export async function logoutAction() {
  // Call the API logout endpoint if one exists
  try {
    await fetch(`${API_HOST}/auth/logout`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).catch(() => {
      // Ignore API errors on logout, we'll delete the cookie anyway
      console.log("Logout API call failed, proceeding with cookie deletion");
    });
  } catch (error) {
    // Continue with logout even if API call fails
    console.error("Error during logout API call:", error);
  }

  await deleteCookie();

  redirect("/login");
}
