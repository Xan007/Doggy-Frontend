import "./Dog.css"

export default function Dog({ imageUrl, fact }) {
    return (
        <figure className="dogFigure">
            <img src={imageUrl} alt="Imagen de un perro"></img>
            <figcaption>{fact}</figcaption>
        </figure>
    )
}