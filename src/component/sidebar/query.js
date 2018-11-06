import gql from "graphql-tag"

export const queryFiles = gql`
    query Files($path: String="")  {
    files(path: $path) {
        name,
        path,
        isDirectory
    }
    }
`