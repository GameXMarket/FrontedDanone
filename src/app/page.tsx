'use client'

import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldValues, Form, useForm } from "react-hook-form"


export default function Home() {

  const form = useForm()

  const onSubmit = (data: FieldValues) => {
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="input"
            render={({field}) => (
              <Input {...field} />
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
    </main>
  )
}
