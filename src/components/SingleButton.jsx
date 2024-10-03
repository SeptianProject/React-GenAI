/* eslint-disable react/prop-types */


const SingleButton = ({ onclick }) => {
    return (
        <button
            onClick={onclick}
            type="submit"
            className="bg-indigo-600 text-white rounded-md py-1 px-3">
            Send
        </button>
    )
}

export default SingleButton