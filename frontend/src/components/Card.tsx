import "./Card.css"
type CardProps ={
    imageUrl?:string
    name?:string
    rating?:number
    description?:string
}

export default function Card({imageUrl, name, rating,description}:CardProps){
    return(
        <div className = 'card'>
            {imageUrl && <img src={imageUrl} alt={name || "Card"} className="card-image" />}
            {name && <h2 className="card-title">{name}</h2>}
            {rating !== undefined && <p className="card-rating">评分：{rating} / 5</p>}
            {description && <p className="card-description">{description}</p>}
        </div>
    )
}