/* eslint-disable react/prop-types */

const InputComponent = ({ input, onchange, text }) => {
    return (
        <input
            type="text"
            className="border border-gray-400 rounded-md py-1 px-3"
            value={input}
            onChange={onchange}
            placeholder={text}
        />
    )
}

export default InputComponent