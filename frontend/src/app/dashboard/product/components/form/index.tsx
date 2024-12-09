'use client'

import { ChangeEvent, useState } from "react";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";

import styles from "./styles.module.scss";

type CategoryProps = {
  id: string,
  name: string
}

type Props = {
  categories: CategoryProps[]
}

export function Form({ categories }: Props) {
  const [image, setImage] = useState<File>()
  const [previewImage, setPreviewImage] = useState("")

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (files?.length) {
      const [image] = files

      if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
        console.log('FORMATO PROIBIDO!!!')
        return
      }

      setImage(image)
      setPreviewImage(URL.createObjectURL(image))
    }
  }

  return(
    <main className={styles.container}>
      <h1>Novo produto</h1>

      <form className={styles.form}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#FFF" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              alt="Image de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          {categories.map(({ id, name }: CategoryProps) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Digite o nome do produto..."
          required
        />

        <input
          className={styles.input}
          type="text"
          name="price"
          placeholder="Preço do produto..."
          required
        />

        <textarea
          className={styles.input}
          name="description"
          placeholder="Digite a descrição do produto"
          required
        ></textarea>

        <Button name="Cadastrar produto" />
      </form>
    </main>
  )
}