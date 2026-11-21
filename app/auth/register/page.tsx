"use client";
import React from "react";
import type { NextPage } from "next";
import RegisterForm from "@/app/forms/auth/registerForm";
import styles from "./style.module.css";

const Register: NextPage = () => {
  return (
    <div className={`min-h-dvh w-full px-4 py-2 sm:px-6 lg:px-8 ${styles.back}`}>
      <div className={`mx-auto w-full max-w-md ${styles.card}`}>
        <div className={`bg-white ${styles.content}`}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;