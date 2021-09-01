import Head from "next/head";
import Client from "../util/caasClient";
import Link from "next/link";

export async function getStaticProps(context) {
    try {
        var client = new Client();
        var query = `{
            m_Content(id:"${context.params.id}") {
                id
                recipe_Title
                recipe_Ingredients
                recipe_Cookinginstructions
                recipe_Description
                recipe_Shortdescription
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
                        m_ContentType_ids:["M.ContentType.Recipe"]
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
                <title>{data.recipe_Title || "unknown"}</title>
            </Head>
            <main>
                <Link href="/">Home</Link>
                <h1>{data.recipe_Title || "unknown"}</h1>
                <p>{data.recipe_Shortdescription || "unknown"}</p>
                <h2>Ingredients</h2>
                <div dangerouslySetInnerHTML={{ __html: data.recipe_Ingredients || "unknown" }}></div>
                <h2>Method</h2>
                <div dangerouslySetInnerHTML={{ __html: data.recipe_Cookinginstructions  || "unknown" }}></div>
            </main>
        </div>
    )
}
