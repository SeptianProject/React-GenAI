
import React, { useState } from 'react'
import SingleButton from './SingleButton'
import InputComponent from './InputComponent'

const SpeechComponent = () => {
    const [text, setText] = useState("")

    const speakText = (text) => {
        if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(text)
            speech.lang = 'id-ID'
            speech.rate = 1
            speech.pitch = 1
            window.speechSynthesis.speak(speech)
        } else {
            alert('Speech not supported')
        }
    }

    const handleInputChange = (e) => {
        setText(e.target.value)
    }

    const handleSpeak = () => {
        speakText(text)
    }

    return (
        <form onSubmit={handleSpeak} className='mt-10'>
            <h1 className='text-center text-3xl font-semibold text-slate-800 mb-10'>Text-to-Speech</h1>
            <InputComponent input={text}
                onchange={handleInputChange} text={'Enter text to speak'} />
            <SingleButton onclick={handleSpeak} />
        </form>
    )
}

export default SpeechComponent