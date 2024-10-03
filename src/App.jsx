import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";
import SingleButton from "./components/SingleButton";
import LoadingCustom from "./components/LoadingCustom";
import SpeechComponent from "./components/SpeechComponent";
import InputComponent from "./components/InputComponent";
import { PiSpeakerHigh, PiSpeakerNone } from "react-icons/pi";
// import OpenAI from "openai";

// const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

// const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-002"
      });
      const result = await model.generateContent(input)
      let response = result.response.text();

      response = response.replace(/\*/g, "");

      setOutput((prevResponse) => [...prevResponse, response]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error. Please try again.");
      setLoading(false);
    }
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1.1;
      speech.pitch = 1;
      speech.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(speech);
      setSpeaking(true);
    } else {
      alert("Speech not supported");
    }
  }

  useEffect(() => {
    if (output.length > 0) {
      const lastOutput = output[output.length - 1];
      speak(lastOutput);
    }
  }, [output])

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.pause();
      setSpeaking(false);
    } else {
      window.speechSynthesis.resume();
      const lastResponse = output[output.length - 1];
      if (lastResponse) {
        speak(lastResponse);
      }
    }
  }

  return (
    <section className="max-w-screen-xl w-full flex flex-col lg:flex-row gap-x-20 items-center justify-center my-20">
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-slate-800 font-semibold">Chat Cuy.co</h1>
          <form onSubmit={handleSubmit} className="mt-10 flex gap-x-5">
            <InputComponent input={input}
              onchange={(e) => setInput(e.target.value)}
              text={'Enter your message'} />
            <SingleButton />
          </form>
        </div>
        <div className="flex flex-col gap-y-5 items-center w-[20rem] h-auto bg-slate-200 p-5 rounded-md">
          <div className="flex items-center gap-x-5">
            <h3 className="">Response: </h3>
            <button onClick={handleSpeak} className="">
              {speaking
                ? <PiSpeakerHigh />
                : <PiSpeakerNone />
              }
            </button>
          </div>
          {
            loading
              ?
              <LoadingCustom />
              :
              <div className="flex flex-col gap-y-3">
                {
                  output.map((item, index) => (
                    <div key={index}>
                      <p className="text-center border border-slate-500 rounded-md p-5">
                        {item}
                      </p>
                    </div>
                  ))
                }
              </div>
          }
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <div className="bg-gray-100 w-full h-1 my-20 lg:hidden block" />
      <div>
        <SpeechComponent />
      </div>
    </section>
  );
};

export default App;
