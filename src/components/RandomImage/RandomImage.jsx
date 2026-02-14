import { useState } from "react"
import "./RandomImage.css"

export default function RandomImage(){

    const [imageUrl] = useState(
        'https://picsum.photos/600/400?random=' + Math.floor(Math.random() * 1000)
    )

    return(
        <div className="r-image-elements">
            <img 
            className="random-image"
            src={imageUrl}
            alt="Random image from Picsum" />
        </div>
    )
}




