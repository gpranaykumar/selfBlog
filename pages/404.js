import SEO from "@bradgarropy/next-seo"

export default function Custom404() {
    return <div style={{minHeight: "70vh"}}>
        <SEO title="Error 404 | SelfBlog" />
        <h1 className=" text-center">404 - Page Not Found</h1>
    </div>
  }