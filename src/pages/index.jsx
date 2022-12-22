import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

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
    <>
      <Head>
        <title>OpenAI - Create Image</title>
      </Head>

      <main className="h-screen bg-slate-200">
        <div className="flex flex-col gap-10 py-10">
          <h3 className="text-center font-base text-4xl tracking-wider">Create an Image, human</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-5 items-center text-center">
            <input
              type="text"
              name="image"
              placeholder="Enter your image prompt here"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="max-w-5xl w-full py-2 px-4 rounded-sm"
            />
            <button type="submit" className="bg-slate-700 font-bold rounded-md text-white py-2 tracking-wider px-2 block uppercase">Create Image</button>
          </form>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center justify-center px-10 w-fit h-fit mb-20">
          {result && result.map((object) => {
            return (
              <>
                <Image src={object.url} key={object.index} height={400} width={400} className="rounded-sm"/>
              </>
            )
          })}
        </div>
      </main>
    </>
  );
}
