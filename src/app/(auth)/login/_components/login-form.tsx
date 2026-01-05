"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { useLogin } from "@/hooks/auth/use-login"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { LoginSchema } from "@/schema/auth"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { PasswordField, TextField } from "@/components/common/form/form"

export const LoginForm = () => {
  const t = useTranslations()

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "a@a.com",
      password: "0552320541"
    }
  })

  const login = useLogin()

  const handleLogin = () => {
    login.mutate({
      data: form.getValues()
    })
  }

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleLogin)}>
        <TextField control={form.control} placeholder='E-mail Address' label='E-mail Address' type='email' name='email' />
        <PasswordField control={form.control} label='Password' name='password' />

        <Button loading={login.isPending} className='w-full'>
          Sign In
        </Button>
      </form>
    </Form>
  )
}
