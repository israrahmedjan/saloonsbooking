// app/lib/auth.ts

import { supabase } from './supabaseClient';

export async function handleSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function handleSignUp(email: string, password: string, metadata?: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  console.log('Current Data',data);
  return { data, error };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}`,
    },
  });
   console.log('Current Data',data);
  return { data, error };
}

export async function handleSignInWithProvider(provider: 'github' | 'twitter' | 'facebook') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  return { error };
}


// Save User Data in in users table
export const saveUser = async (user: any) => {

  const provider = user.app_metadata?.provider;
  console.log("Current Provider is ", provider);
  let userData = {}
  switch (provider) {
  case "google":
    userData = {
      auth_id: user.id,
      email: user.email,
      first_name: user.user_metadata.full_name,
      avatar_url: user.user_metadata.avatar_url,
      phone: user.phone,
      user_role: "customer",
    };
    break;

  case "github":
    userData = {
      auth_id: user.id,
      email: user.email,
      first_name: user.user_metadata.user_name,
      avatar_url: user.user_metadata.avatar_url,
      phone: user.phone,
      user_role: "customer",
    };
    break;

  case "email":
    userData = {
      auth_id: user.id,
      email: user.email,
      first_name: user.user_metadata.username,
      phone: user.phone,
      user_role: "customer",
    };
    break;

  default:
    console.log("Provider not found");
    return false;
}
  const { data, error } = await supabase.from("users").upsert(
    userData,
  {
    onConflict: "auth_id",
  }
  ).select()
  .single();

  if (error) {
    console.error("Failed to save user:", error.message);
    return false;
  }
  
  return {data,error};
};