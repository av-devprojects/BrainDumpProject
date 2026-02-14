import { useState, useEffect } from "react";
import "./RandomQuote.css";

export default function RandomQuote(){

    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch(
                    "https://api.api-ninjas.com/v2/quotes?categories=success,wisdom",
                    {
                        headers: {
                            "X-Api-Key": import.meta.env.VITE_API_KEY
                        }
                    }
                );

                const data = await response.json();
                setQuote(data[0]);
            } catch (error) {
                console.error("Error fetching quote:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, []);

    return(
        <div className="r-quote-elements">
            <h3>Quote of the day</h3>
            {loading && <div>Loading...</div>}
            {quote && (
                <div className="r-quote">
                    <p>"{quote.quote}"</p>
                    <small>- {quote.author}</small>
                </div>
            )}
        </div>
    );
}
