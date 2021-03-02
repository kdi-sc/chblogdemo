class CaaSClient {
    constructor() {
        this.url = process.env.GRAPHQL_URL;
        this.tenantId = process.env.GRAPHQL_TENANTID;
        this.token = process.env.GRAPHQL_TOKEN;
    }

    async fetch(query) {
        const response = await fetch(this.url + "/" + this.tenantId, {
            method: "POST",
            headers: {
                "X-GQL-Token": `${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: query
            })
        });

        return (await response.json()).data;
    }
}

export default CaaSClient;
