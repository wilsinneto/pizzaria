import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "/public/logo.svg"
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {

  async function handleLogin(formData: FormData) {
    "use server"

    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
      return
    }

    try {
      const response = await api.post("/session", {
        email,
        password
      })
      const { token } = response.data

      if (!token) {
        return
      }

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies()

      cookieStore.set("session", token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })
    } catch (error) {
      console.log("error", error)
      return
    }

    redirect("/dashboard")
  }

  return(
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo da pizzaria"
        />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email..."
              className={styles.input}
            />
            <input
              type="password"
              required
              name="password"
              placeholder="**********"
              className={styles.input}
            />

            <button
              type="submit"
              className={styles.button}
            >
              Acessar
            </button>

            <Link href="/signup" className={styles.text}>Não possui uma conta? Cadastre-se</Link>
          </form>
        </section>
      </div>
    </>
  )
}