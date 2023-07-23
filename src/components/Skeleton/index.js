import "./style.css";

const Skeleton = ({ width, height }) => {
    return (
        <div className="skeleton" style={{
            width,
            height
        }} />
    )
}

export default Skeleton;