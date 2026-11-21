'use client'

import React from 'react'
import type { NextPage } from 'next'
import LoginForm from '@/app/forms/auth/loginForm'
import styles from './style.module.css'

const Login: NextPage = () => {
  return (
    <div className={styles.back}>
      <div className={styles.card}>
        <div className={styles.content}>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
