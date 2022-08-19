import { Spinner } from "./Spinner";

function Loading () {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loading;