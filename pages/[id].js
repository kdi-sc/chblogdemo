import Head from "next/head";
import Client from "../util/caasClient";
import Link from "next/link";

export async function getStaticProps(context) {
    try {
        var client = new Client();
        var query = `{
            allM_Content_Blog(id:"${context.params.id}") {
                id
                blog_Title
                blog_Body
            }
        }`;

        /*
        recipe_Title
        recipe_Shortdescription
        recipe_Ingredients
        recipe_Cookinginstructions
        */

        const data = await client.fetch(query);

        return {
            props: {
                data: data.m_Content
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

export async function getStaticPaths() {
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
        <div>
            <Head>
                <title>{data.blog_Title || "unknown"}</title>
            </Head>
            <main>
                <Link href="/">Home</Link>
                <h1>{data.blog_Title || "unknown"}</h1>
                <h2>Body</h2>
                <div dangerouslySetInnerHTML={{ __html: data.blog_Body || "unknown" }}></div>
            </main>
        </div>
    )
}
