"use client";
import React from 'react';
import type { NextPage } from 'next';
import LoginForm from '@/app/forms/auth/loginForm';
import styles from './page.module.css';

const HomePage: NextPage = () => {
    return (
        <div className={`min-h-dvh w-full px-4 py-2 sm:px-6 lg:px-8 ${styles.back}`}>
            <div className={`mx-auto w-full max-w-md ${styles.card}`}>
                <div className={`bg-white ${styles.content}`}>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default HomePage;