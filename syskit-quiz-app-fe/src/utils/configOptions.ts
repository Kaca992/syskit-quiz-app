export function appendServiceApiEndpoint(url: string): string {
    return process.env.NODE_ENV === "production" ? `https://dinotestfunctions.azurewebsites.net/${url}` : `http://localhost:7071/${url}`;
}
