import Link from "next/link";

export default function List({ data }) {
    if(data.length == 0)
        return (
            <div>
                <p>No content</p>
            </div>
        )
    
    data.forEach(blog => {
        blog.blog_Body = blog.blog_Body.substring(0,200) + "..."; 
    });

    return (
        <div className="grid">
            <ul>
                {data.map((content) => (
                    <div className="card">
                    <li key={content.id}>               
                        <div className="blogtitle"><Link href={`/${content.id}`}>{content.blog_Title}</Link></div>
                        <div dangerouslySetInnerHTML={{ __html: content.blog_Body || "unknown" }}></div>
                    </li>
                    </div>
                ))}            
            </ul>
            <style jsx>{`
                ul {
                    list-style: none;
                }
            `}</style>
        </div>
    )
};
