
import { useState } from 'react'
import SingleButton from './SingleButton'
import InputComponent from './InputComponent'

const SpeechComponent = () => {
    const [text, setText] = useState("")

    const speakText = (text) => {
        if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(text)
            speech.lang = 'id-ID'
            speech.rate = 1.1
            speech.pitch = 1
            window.speechSynthesis.speak(speech)
        } else {
            alert('Speech not supported')
        }
    }

    const handleSpeak = async (e) => {
        e.preventDefault()
        await speakText(text)
    }

    return (
        <form onSubmit={handleSpeak} className='flex flex-col gap-y-10 items-center'>
            <h1 className='text-center text-3xl font-semibold text-slate-800'>Text-to-Speech</h1>
            <div className='flex gap-x-4'>
                <InputComponent input={text}
                    onchange={(e) => setText(e.target.value)} text={'Enter text to speak'} />
                <SingleButton onclick={handleSpeak} />
            </div>
        </form>
    )
}

export default SpeechComponent