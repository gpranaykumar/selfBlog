import React from 'react'
import Link from 'next/link';

const Footer = () => {
    return (
        <div className='container p-3'>
            <div className='text-center py-3'>
                <h4 className=''>
                    @{new Date().getFullYear()} All rights reserved.
                    Developed by <Link href="https://www.instagram.com/pranaykumar001" >G Pranay Kumar</Link>
                </h4>
            </div>
        </div>
    )
}

export default Footer
