export function appendServiceApiEndpoint(url: string): string {
    // TODO process env is not working currently, when upgrade to new webpack it will be ok
    // return process.env.NODE_ENV === "production" ? `https://dinotestfunctions.azurewebsites.net/${url}` : `http://localhost:7071/${url}`;
    return `https://dinotestfunctions.azurewebsites.net/${url}`;
}
