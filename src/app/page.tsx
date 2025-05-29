'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false); 

  const onSubmit = () => {
    if (isLogin) {
      authClient.signIn.email({
        email,
        password,
      }, {
        onError: (error) => {
          window.alert("Login failed: " + error);
        },
        onSuccess: () => {
          window.alert("Login successful");
        }
      });
    } else {
      authClient.signUp.email({
        email,
        password,
        name,
      }, {
        onError: (error) => {
          window.alert("Signup failed: " + error);
        },
        onSuccess: () => {
          window.alert("User created successfully");
        }
      });
    }
  }

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">Welcome {session.user.name}</h1>
        <p className="text-gray-500">Email: {session.user.email}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-y-4 max-w-sm mx-auto">
      {!isLogin && (
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>
        {isLogin ? "Login" : "Create Account"}
      </Button>
      <Button variant="ghost" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </Button>
    </div>
  );
}
