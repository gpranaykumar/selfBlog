import React, {useContext, useState, useEffect} from 'react'
import Link from 'next/link';
import { getCategories } from '../services'
import { useTheme } from 'next-themes';
const Header = () => {
    const {systemTheme, theme, setTheme} = useTheme()
    const [categories, setcategories] = useState([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        getCategories()
            .then((newCategories) => setcategories(newCategories))
    },[])


    const renderThemeChanger = () => {
        if(!mounted) return null
        const currentTheme = theme === 'system' ? systemTheme : theme;

        if(currentTheme === 'dark'){
            return (
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setTheme('light')}
                 className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                </svg>
            )
        }else{
            return (
                <svg xmlns="http://www.w3.org/2000/svg"  onClick={() => setTheme('dark')}
                className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            )
        }
    }
    return (<>
        <div className="relative bg-white dark:bg-itemD mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start  lg:flex-1">
                            <Link href='/'>
                                <span className='cursor-pointer font-bold text-2xl text-blue-600 dark:text-white'>
                                    SelfBlog
                                </span>
                            </Link>
                    </div>
                    <div className="md:flex items-center pt-1 justify-end md:flex-1 lg:w-0">
                        {renderThemeChanger()}
                    </div>
                    <div className='hidden md:float-left md:contents'>
                                {categories.map((category) => (
                                    <Link key={category.slug} href={`/category/${category.slug}`}>
                                        <span className='md:float-right mt-2 align-middle text-black dark:text-white ml-4 font-semibold cursor-pointer'>
                                            {category.name}
                                        </span>
                                    </Link>
                                ))}
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default Header
