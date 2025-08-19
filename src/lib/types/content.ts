export interface Commit {
    sha: string
    url: string
    commit: {
        message: string
        author: {
            date?: string
        } | null
    }
}