"use client";
import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentails } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ name: "", username: "", email: "", password: "" }}
      onSubmit={signUpWithCredentails}
    />
  );
};

export default SignUp;
