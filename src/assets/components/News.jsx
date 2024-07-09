import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import LoadingBar from 'react-top-loading-bar'
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroller';

const News = ({ category, pageSize, close, setClose }) => {
    
    let nextPage = 0
    const [response, setResponse] = useState([])
    const [totalPage, setTotalPage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const[newsCategory, setNewsCategory] = useState(category)
    const key = import.meta.env.VITE_API_KEY
    let data = null
    
    const fetchNews = async (newsPageno) => {
        if (newsPageno === 1) {
            console.log("Page no = ",newsPageno);
            setLoading(true)
            setProgress(30)
        }
        // setLoading()
        // setProgress(30)
        console.log("current page", newsPageno);
        console.log("category", category);
        const newsapi = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}&page=${newsPageno}&pageSize=${pageSize}`)
        data = await newsapi.json()
        console.log(data);
        document.title = `News Monkey - ${category.charAt(0).toUpperCase() + category.slice(1)} News`
        // setLoading(false)
        // setProgress(100)
        // setProgress(newsPageno==1 ? 100 : 100)
      
        // setProgress(100)
        // setLoading(false)
        // setResponse(newsPageno==1 ? data.articles : [...response, ...data.articles])

        if (newsPageno === 1) {
            console.log("Page no = ",newsPageno);
            setLoading(false)
            setProgress(100)
            setResponse(data.articles)
            
        } else {
            setResponse((prevResponse) => [...prevResponse, ...data.articles])
        }

        console.log(response);
        console.log("Total pages in console", Math.ceil(data.totalResults / pageSize));
        console.log(`Total results in ${category} news`, data.totalResults);
        setTotalPage(Math.ceil(data.totalResults / pageSize))
        console.log("page size", pageSize);
        console.log("total results", data.totalResults, "total pages", totalPage);
    }

    const fetchMoreData = async () => {
        nextPage = page + 1
        await fetchNews(nextPage)
        setPage(nextPage)
        // console.log("Fetching more news for page", nextPage);
        // console.log("current page", page);
        // const newsapi =`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}&page=${nextPage}&pageSize=${pageSize}`
        // console.log("newsapi", newsapi);
        // const fetchdata = await fetch(newsapi)
        // data = await fetchdata.json()
        // setTimeout(() => {
        //     setResponse((prevrespone) => [...prevrespone,...data.articles])
        // }, 1000);
        // setPage(nextPage)
        // document.title = `News Monkey - ${category.charAt(0).toUpperCase() + category.slice(1)} News`
        // console.log("Fetched more articles:", data.articles.length);
        // console.log("Updated total articles:", response.length + data.articles.length);
        // setTotalPage(Math.ceil(data.totalResults / pageSize));
        // console.log("Updated total pages:", Math.ceil(data.totalResults / pageSize));
    }

    const handleClose = () => {
        setClose(!close)
    }

   
    useEffect(() => {
        setPage(1)
        setResponse([])
        // setNewsCategory(category)
        fetchNews(1)
    }, [category])


    return (
        <div className='md:mt-0 mt-32'>
            <h1 className="text-center text-4xl my-5 gradient-text">{category ? `News Monkey - ${category.charAt(0).toUpperCase() + category.slice(1)} ` : "News Monkey - Top Headlines"}</h1>
            <div className={`flex md:justify-center md:items-center md:visibile md:flex-wrap md:relative md:flex-row flex-col md:w-full w-fit p-4 ${close ? "closeClass" : "notClose"} rounded-lg fixed top-0 md:bg-transparent bg-[#242424] md:min-h-fit min-h-screen z-30`}>
                <div className="md:hidden right-3 top-1 w-fit absolute" onClick={handleClose}>
                    <lord-icon
                        src="https://cdn.lordicon.com/zxvuvcnc.json"
                        trigger="hover">
                    </lord-icon>
                </div>
                <span className='text-xl text-white md:my-0 my-4 mt-8'>Top Categories : </span>
                <Link to="/business" className="mx-2 bg-black rounded-lg p-2 my-2">Business</Link>
                <Link to="/entertainment" className="mx-2 bg-black rounded-lg p-2 my-2">Entertainment</Link>
                <Link to="/general" className="mx-2 bg-black rounded-lg p-2 my-2">General</Link>
                <Link to="/health" className="mx-2 bg-black rounded-lg p-2 my-2">Health</Link>
                <Link to="/science" className="mx-2 bg-black rounded-lg p-2 my-2">Science</Link>
                <Link to="/sports" className="mx-2 bg-black rounded-lg p-2 my-2">Sports</Link>
                <Link to="/technology" className="mx-2 bg-black rounded-lg p-2 my-2">Technology</Link>


            </div>
            <div className="flex flex-wrap gap-4 mx-[5%] justify-center my-10">
                {loading && <h1><LoadingBar
                    color='#ffff'
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                /></h1>}
                <InfiniteScroll
                    pageStart={0}
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap : '25px'} }
                    hasMore={page < totalPage}
                    loadMore={fetchMoreData}
                    loader={<div className="flex justify-center my-5 w-full"><ScaleLoader color="#ffff" /></div>}
                >
                    {!loading && response.map((article, index) => (
                    <NewsItem key={index} title={article.title} text={article.description} imgUrl={article.urlToImage} author={article.author} time={article.publishedAt} source={article.source.name} url={article.url} />

                ))}
                </InfiniteScroll>
                
            </div>
            {/* <div className='flex justify-around my-6'>
                <button disabled={page == 1} className={`rounded-lg bg-black my-5 p-3 disabled:cursor-not-allowed`} onClick={handlePrev}>&lt; Previous</button>
                <button className="rounded-lg bg-black my-5 p-3 disabled:cursor-not-allowed" disabled={page == totalPage} onClick={handleNext}>Next &gt;</button>
            </div> */}
        </div>
    )
}

export default News
