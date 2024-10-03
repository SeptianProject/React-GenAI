import Loading from "react-loading";


const LoadingCustom = () => {
    return (
        <div className="mt-5">
            <Loading type="spin" color="#000000" height={40} width={40} />
        </div>
    )
}

export default LoadingCustom