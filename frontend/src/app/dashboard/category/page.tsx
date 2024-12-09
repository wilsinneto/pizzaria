import styles from './styles.module.scss'

import { Button } from '@/app/dashboard/components/button'
import { api } from '@/services/api'
import { getCookiesServer } from '@/lib/CookieServer'
import { redirect } from 'next/navigation'

export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    'use server'

    const name = formData.get('name')

    if (name === '') return

    const data = {
      name
    }

    const token = await getCookiesServer();

    await api.post("/category", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      console.log("error?.name", error?.name)
      console.log("error?.message", error?.message)

      return
    })

    redirect('/dashboard')
  }

  return(
    <main className={styles.container}>
      <h1>Nova Categoria</h1>

      <form
        className={styles.form}
        action={handleRegisterCategory}
      >
        <input
          type="text"
          name='name'
          placeholder='Nome da categoria, ex: Pizzas'
          required
          className={styles.input}
        />

        <Button name='Cadastrar' />
      </form>
    </main>
  )
}