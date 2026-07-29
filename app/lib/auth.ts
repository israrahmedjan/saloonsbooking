 
 import { supabase } from "@/app/lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";
import { slotsType } from "./types";
 // Logout
 export const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
      return;
    }

    console.log("Logged Out");
  };


    // Google Login
  export const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/payment`,
      },
    });

    if (error) {
      console.error(error.message);
    }
  };


  // Email Signup
 export const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: "israrahmed0778@gmail.com",
        password: "Test@123456",
      });

      if (error) throw error;

      console.log("Signup Success:", data);
      alert("Signup Successful!");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
      }
    }
  };


// Email Login
export const handleSignIn = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "israrahmed0778@gmail.com",
      password: "Test@123456",
    });

    if (error) throw error;

    console.log("Login Success:", data);
    alert("Login Successful!");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      alert(error.message);
    }
  }
};  


// Get checkout Session

export const getUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // updateUser(session);
      // setLoading(false);
    //  return data;
    return session;
    };


// Add Payment Now Button
export const PayNowProcess = async (user:any,cart:slotsType[]) => {
  try {
    
    const currentUser = await getUserSession()
    // if(currentUser)
    // {
    //   alert('User sign in');
    // }
    // else
    // {
    //   alert('Not Sign in')
    // }
    // return false;
  console.log(user);
  // return false;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    user: user,
    cart,
  }),
    });
 
    if (!response.ok) {
      throw new Error("Failed to create checkout session.");
    }

    const session = await response.json();

    if (!session.url) {
      throw new Error("Checkout URL not found.");
    }

    window.location.href = session.url;
  } catch (error) {
    console.error("Payment Error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again."
    );
  }
};


// New functions

