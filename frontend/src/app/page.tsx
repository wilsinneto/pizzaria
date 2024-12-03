import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "/public/logo.svg"
import Link from "next/link";

export default function Page() {
  return(
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo da pizzaria"
        />

        <section className={styles.login}>
          <form>
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

            <button type="submit">
              Acessar
            </button>

            <Link href="/signup" className={styles.text}>Não possui uma conta? Cadastre-se</Link>
          </form>
        </section>
      </div>
    </>
  )
}