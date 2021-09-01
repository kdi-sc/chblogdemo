import Link from "next/link";

export default function List({ data }) {
    if(data.length == 0)
        return (
            <div>
                <p>No content</p>
            </div>
        )

    return (
        <div>
            <ul>
                {data.map((content) => (
                    <li key={content.id}>
                      
                        <Link href={`/${content.id}`}>{content.content_Name}</Link>
                    </li>
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
