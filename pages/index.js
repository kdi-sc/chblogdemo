import Head from "next/head";
import Client from "../util/caasClient";
import List from "../components/contentList";

export async function getServerSideProps() {
    try {
        var client = new Client();

        var pageQuery = `{}`;
        //const pageData = await client.fetch(pageQuery);
        const pageData = {
            webPage: {
                title: "Sitecore Content Hub and Next.js",
                body: "Blog | Powered By Next.js and Sitecore Experience Edge"
            }
        };

        var blogQuery = `{
                allM_Content_Blog {
                total
                results {
                id
                blog_Title
                blog_Body
                }
                }
                }`;
              
        const blogData = await client.fetch(blogQuery);

        return {
            props: {
                data: blogData,
                content:  pageData
            }
        }
    }
    catch(error) {
        console.log("Failed to fetch data from GraphQL endpoint", error);
        return {
            props: {
                data: []
            }
        }
    }
}

export default function Home({data, content}) {
    let list = [];
    if(data.allM_Content_Blog && data.allM_Content_Blog.results)
        list = data.allM_Content_Blog.results;

    return (
        <div className="container">
            <Head>
                <title>{content.webPage.title}</title>
                <link rel="icon" href="/public/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>

            <main  className="main">
                <h1  className="title">{content.webPage.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content.webPage.body || "unknown" }}></div>                
                <List data={list} />
            </main>
        </div>
    )
}
