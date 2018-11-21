import gql from "graphql-tag"



export const queryFilesFragment = gql`
    query Files($path: String="")  {
        files(path: $path) {
            name,
            path,
            isDirectory
        }
    }
`

export const queryFileContentFragment = gql`
    query File($path: String!){
        fileContent(path: $path){
            content
        }
    }
`

export const updateFileContentFragment = gql`
    mutation updateFileContent($file: String!){
        updateFileContent(file: $file){
            status
        }
    }
`

export const baseDir = gql`
    query baseDir{
        baseDir{
            path,
            name
        }
    }
`
