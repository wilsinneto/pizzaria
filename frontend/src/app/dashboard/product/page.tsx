
import { getCookiesServer } from '@/lib/CookieServer';
import { Form } from './components/form'
import { api } from "@/services/api";

export default async function Product() {
  const token = await getCookiesServer();
  const { data: categories } = await api.get('/category', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return(
    <Form categories={categories} />
  )
}