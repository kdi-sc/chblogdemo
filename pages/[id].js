import Head from "next/head";
import Client from "../util/caasClient";
import Link from "next/link";

export async function getServerSideProps(context) {
    try {
       
        var client = new Client();
        var query = `{
            allM_Content_Blog(where: 
                {id_eq:"${context.params.id}"}) {
                  results
                  {
                   id
                   blog_Title
                   blog_Body
                  }
              }
        }`;

        const data = await client.fetch(query);

        return {
            props: {
                data: data.allM_Content_Blog.results[0]
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
};

export async function getServerSidePaths() {
    let data = [];
    try {
        var client = new Client();
        var query = `{
            allM_Content(
                first: 10,
                where:{
                    contentTypeToContent: {
                        m_ContentType_ids:["M.ContentType.Blog"]
                    }
                }
            ) {
                results {
                    id
                }
            }
        }`;

        data = await client.fetch(query);
    }
    catch(error) {
        console.log("Failed to fetch data from GraphQL endpoint", error);
    }

    var paths = data.allM_Content.results.map(d => ({
        params: { id: d.id }
    }));

    return {
        paths: paths,
        fallback: false
    }
}

export default function Content({data}) { 
    return (
        <div className="container">
            <Head>
                <title>{data.blog_Title || "unknown"}</title>
            </Head>
            <main className="main">
                <Link href="/">Home</Link>
                <h1 className="title">{data.blog_Title || "unknown"}</h1>
                <div className="blog" dangerouslySetInnerHTML={{ __html: data.blog_Body || "unknown" }}></div>
            </main>
        </div>
    )
}
