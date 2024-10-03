import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import SingleButton from "./components/SingleButton";
import LoadingCustom from "./components/LoadingCustom";
import SpeechComponent from "./components/SpeechComponent";
import InputComponent from "./components/InputComponent";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gemini AI
      setLoading(true);
      const model = genAI.getGenerativeModel({
        model: "gemini-pro", generationConfig: {

        }
      });
      const result = await model.generateContent(input)
      const response = result.response.text();

      // console.log(response);
      setOutput([
        ...output, response
      ])

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center gap-x-20 items-center">
      <div>
        <div className="flex flex-col items-center mt-20">
          <h1 className="text-3xl text-slate-800 font-semibold">Chat Cuy.co</h1>
          <form onSubmit={handleSubmit} className="mt-10 flex gap-x-3">
            <InputComponent input={input}
              onchange={(e) => setInput(e.target.value)}
              text={'Enter your message'} />
            <SingleButton />
          </form>
        </div>
        <div className="mt-20 flex flex-col items-center w-[30rem] h-auto bg-slate-200 p-7 rounded-md">
          <h3 className="mb-5">Response: </h3>
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

      <div>
        <SpeechComponent />

      </div>
    </section>
  );
};

export default App;
