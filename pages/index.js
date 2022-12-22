import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [imageInput, setImageInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: imageInput }),
      });
      const data = await response.json();
      setResult(data.result);
      setImageInput("");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Create an Image</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="image"
            placeholder="How would you like to create your image?"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
          <input type="submit" value="Create Image" />
        </form>
        <div className={styles.result}>
          {result && result.map((object, index) => {
            return (
              <>
                <Image src={object.url} key={object.index} height={400} width={400} />
              </>
            )
          })}
        </div>
      </main>
    </div>
  );
}
