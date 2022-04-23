import { NextPage } from "next";

export const getServerSideProps = ({ res }: any) => ({
    props: {
        dbData: res.dbData
    }
})

const test: NextPage = ({ dbData}: any) => {
    return (<h1>Test { dbData }</h1>)
}

export default test;