import Link from "next/link"
import Image from "next/image"
import { LogOutIcon } from "lucide-react";
import logoImg from "/public/logo.svg";

import styles from "./styles.module.scss"

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <Image
            alt="Logo Sujeito Pizza"
            src={logoImg}
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>

        <nav>
          <Link href="/dashboard/category">
            Categoria
          </Link>
          <Link href="/dashboard/product">
            Produto
          </Link>

          <form>
            <button type="submit">
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}