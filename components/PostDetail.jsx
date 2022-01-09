import React,{useState, useEffect} from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from 'moment';
const PostDetail = ({ post }) => {
  const [copyTextBtn,setCopyTextBtn] = useState(false)
  const [copyText,setCopyText] = useState('copy')


  useEffect(() => {
    if(copyTextBtn){
      setTimeout(() => {
        setCopyTextBtn(false)
        setCopyText('copy')
      }, 3000)
    }
  },[copyTextBtn])
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
        case 'code-block':
            return <>
            <CopyToClipboard text={modifiedText}>
              <div className='grid grid-cols-1 pb-2 px-1'>
                <button
                  className="flex justify-end"
                  onClick={() => {
                    setCopyTextBtn(true)
                    setCopyText('copied')
                  }}
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  {copyText} {copyTextBtn && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 px-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg> }
                </button>
            </div>
            </CopyToClipboard>
            <pre key={index}  className="mb-8 bg-itemD dark:border dark:shadow- dark:shadow-shadowD text-white overflow-x-auto p-2">
              <code key={index} >{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</code>;
            </pre>
            </>
      default:
        return modifiedText;
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-itemD shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden  mb-6">
          <img src={post.featuredImage.url} alt="" className="object-top h-full w-100 object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle dark:text-tSecD ml-2 font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle dark:text-tSecD">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          <p className="mb-8 ">{post.excerpt}</p>
          {console.log(post.content.raw)}
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>

    </>
  );
};

export default PostDetail;