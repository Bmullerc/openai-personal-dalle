import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [imageInput, setImageInput] = useState("");
  const [result, setResult] = useState();
  const [history, setHistory] = useState([]);

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
      setIsLoading(false)
      setImageInput("");
      handleAddHistory()
    } catch (error) {
      console.log(error)
    }
  }

  function handleClick() {
    setIsLoading(true)
  }

  function handleAddHistory() {
    const text = imageInput
    if (text === "") return
    setHistory(prevText => [text, ...prevText,])
  }

  function clearHistory() {
    if (window.confirm('Are you sure you want to delete your Prompt History?')) {
      setHistory([])
    } else return
  }

  function handleHistoryClick() {
    setImageInput()
  }

  return (
    <>
      <Head>
        <title>OpenAI - Create Image</title>
      </Head>

      <main className="h-screen bg-zinc-200">
        <div className="flex flex-col gap-10 py-10">
          <h3 className="text-center font-bold text-5xl tracking-wide">Create an Image, human.<Image src="/robot1.png" height={150} width={150} /></h3>
          <form onSubmit={onSubmit} className="flex flex-row gap-5 items-center justify-center text-center">
            <input
              type="text"
              name="image"
              placeholder="Enter your image prompt here"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="max-w-5xl w-full py-2 px-4 rounded-sm"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleClick}
              className="bg-zinc-700 font-bold rounded-md text-white py-2 tracking-wider px-2 block uppercase hover:opacity-70 hover:scale-95 duration-200 disabled:grayscale"
            >Create Image</button>
          </form>

          {history.length !== 0 && <section className="font-medium max-w-5xl w-full m-auto">
            <div className="text-2xl text-white font-bold bg-zinc-500 flex justify-between h-fit items-center px-4 py-3 rounded">
              <h4>Prompt History</h4>
              <button className="bg-red-500 text-base hover:opacity-70 hover:scale-95 duration-200 rounded-sm tracking-tighter uppercase py-1 px-2" onClick={clearHistory}>Clear History</button>
            </div>

            <div className="flex flex-col py-4 px-4 text-lg bg-zinc-300 gap-4">
              {history.map(text => <p onClick={handleHistoryClick}>{text}</p>)}
            </div>
          </section>}

        </div>

        <div className="grid grid-flow-col m-auto gap-8 items-center justify-center px-10">
          {isLoading ? <h3>Loading...</h3> : result && result.map((object) => {
            return (
              <>
                <Image src={object.url} key={object.index} height={400} width={400} className="rounded-sm" />
              </>
            )
          })}

        </div>
      </main>
    </>
  );
}
