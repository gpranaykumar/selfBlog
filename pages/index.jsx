import Head from 'next/head'
import { PostCard, Categories, PostWidget} from '../components'
import {  getPostsPagination, getPostsPaginationSearch} from '../services'
import {FeaturedPosts} from '../sections'
import { useState, useEffect } from "react";
export default function Home({postsProps, hasPreviousPageProps, hasNextPageProps, pageSizeProps}) {
  const [skip, setSkip] = useState(0);
  const [posts, setPosts] = useState(postsProps);
  const [hasPreviousPage, setHasPreviousPage] = useState(hasPreviousPageProps);
  const [hasNextPage, setHasNextPage] = useState(hasNextPageProps);
  const [pageSize, setPageSize] = useState(pageSizeProps);
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if(searchValue !== ''){
      setSkip(0)
    }
      getPostsPaginationSearch(searchValue,skip)
        .then((result) => {
          console.log("useEffect:")
          console.log(result)
          setPosts(result.postsConnection.edges)
          setHasNextPage(result.postsConnection.pageInfo.hasNextPage)
          setHasPreviousPage(result.postsConnection.pageInfo.hasPreviousPage)
          setPageSize(result.postsConnection.pageInfo.pageSize)
        })
    
  },[skip, searchValue])


  const handleChange = (event) => {
    setSearchValue(event.target.value);
  }
  return (
    <div className="container mx-auto px-10 mb-8  ">
      <Head>
        <title>Self Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <FeaturedPosts /> */}
      <div className='py-4'>
        <input className="shadow appearance-none border border-tSecD rounded-xl w-full
         py-2 px-3 text-gray-700 leading-tight 
         focus:outline-none focus:shadow-outline
         bg-white dark:bg-itemD" 
              id="searchValue" type="text" placeholder="Enter post title to Search ..." onChange={handleChange}/>
        <div className="text-tSecD pt-3">
          Total Posts in this Page: {pageSize}
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 '>
        <div className='lg:col-span-8 col-span-1'>
        {posts.length === 0 && <h2 className='text-center'>No Posts</h2> }
          <>
            {
              posts.map((post, index) => (
                <PostCard post={post.node} key = {post.title} />
              ))
            }
          </>
            <div className="flex space-x-5 justify-center items-center mt-10">
            
              <div>
                <button
                  onClick={() => {
                    setSkip(skip - 1);
                  }}
                  disabled={!hasPreviousPage}
                  className="bg-blue w-22 text-white px-3 py-1 rounded-md 
                  disabled:bg-white disabled:text-tSecD
                  dark:disabled:bg-itemD dark:disabled:text-tSecD">
                  Previous
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSkip(skip + 1);
                  }}
                  disabled={!hasNextPage}
                  className="bg-blue w-20 text-white px-3 py-1 rounded-md 
                  disabled:bg-white disabled:text-tSecD
                  dark:disabled:bg-itemD dark:disabled:text-tSecD">
                  Next
                </button>
              </div>
              
            </div>
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories/>
          </div>
        </div>
      </div>
      <div className='mt-6'>

      <FeaturedPosts />
      </div>
    </div>
  )
}

export async function getStaticProps(){
  const result = (await getPostsPagination(0)) || {postsProps: [] , hasPreviousPageProps: false, hasNextPageProps: false, pageSizeProps:0 }
  return {
    props: {
      postsProps: result.postsConnection.edges,
      hasPreviousPageProps: result.postsConnection.pageInfo.hasPreviousPage,
      hasNextPageProps: result.postsConnection.pageInfo.hasNextPage,
      pageSizeProps: result.postsConnection.pageInfo.pageSize
    }
  }
}

