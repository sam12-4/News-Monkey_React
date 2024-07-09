import React from 'react';

const NewsItem = ({ title, text, imgUrl, author, time, source, url }) => {
    const truncateText = (text) => {
        const maxLength = 150;
        if (!text) return "";
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";

        } else {
            return text;
        }
    };

    const truncateTitle = (text) => {
        const maxLength = 40;
        if (!text) return "";
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    const formatDate = (dateString) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
    
        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
    
        return `${month} ${day}, ${year}`;
    };

    return (
        <div className='relative'>
            {source && <span className='absolute bg-slate-900 p-1 rounded-lg top-2 right-1'>{source}</span>}
            <div className="card p-4 text-white rounded-lg bg-gradient-to-r from-black to-gray-600 min-h-96 my-2 md:w-[28vw] w-[70vw]" >
                <img src={imgUrl ? imgUrl : "./news.webp"} className="card-img-top h-60 w-full" alt="news" />
                <div className="card-body">
                    <h5 className="card-title my-2 text-xl mb-4">{truncateTitle(title)}</h5>
                    <p className="card-text my-2">{truncateText(text)}</p>
                        <div className='my-2'>
                            <span className='text-slate-300'>Published at {formatDate(time)} by {author? author : "Unknown"}</span>
                        </div>
                    <a href="#" className="rounded-lg bg-black p-2">
                        <button className='my-3'><a href={url} target="_blank">Read More</a></button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
