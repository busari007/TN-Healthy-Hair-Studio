import stars from "/src/assets/images/5stars.png";

export default function Section5(){

    const reviews = [
        {
            description:"“From the moment I walked in, the calming scent and music put me at ease. My therapist was attentive, and I left feeling lighter in body and mind.”",
            name:"Isabelle M."
        },
        {
            description:"“Serene Bloom has become my go‑to escape from a hectic schedule. I always leave with a calm mind and glowing skin. Their facials are especially gentle and the results last.”",
            name:"Clara H."
        },
        {
            description:"“After just one body scrub session, my skin felt so smooth and refreshed - I couldn’t stop touching my arms. The natural products they use are subtle and effective I’m hooked. “",
            name:"Elena T."
        },
        {
            description:"“It’s more than a spa — it’s a sanctuary. TN Healthy Hair Studio truly understands how to care for you, with every detail thoughtfully crafted.I look forward to every visit.”",
            name:"Sophie D."
        },
    ]

    return(
        <div className="w-full mt-16">
            <div className="flex flex-col items-center w-full text-black">
                {/* Header Block */}
                <div className="w-[90%] md:w-[97.5%] h-[264px] bg-[#D8CEC4] mt-10 flex flex-col items-center text-center justify-start">
                    <img src="https://cdn-icons-png.flaticon.com/128/7720/7720792.png" alt="quotes_icon" className="w-12 h-12 lg:w-14 lg:h-14 mt-8"/>
                    <h1 className="Playfair w-[80%] text-3xl lg:text-4xl mt-4">
                        What Our Guests Are Saying
                    </h1>
                </div>

                {/* Review Block */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center mt-10 gap-y-5">
                    {/* Reviews */}
                    {reviews.map((review,index)=>(
                        <div key={index} className="w-[90%] h-[264px] lg:h-[280px] flex flex-col items-center text-center bg-white justify-between p-7">
                        <div className="flex flex-col items-center w-full">
                            <img src={stars} alt="stars" className="w-20 mb-3"/>
                            <h1 className="w-[75%] Lato text-[13.6px]">
                                {review.description}
                            </h1>
                        </div>
                        <p className="Lato text-[12px]">{review.name}</p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}