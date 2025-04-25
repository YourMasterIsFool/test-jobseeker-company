import { ReactNode } from "react"



interface IMainContent {
    children: ReactNode,
    title: string
}
export default function MainContent(props: IMainContent) {
    return <div className="px-12">
        <h1 className="text-center font-bold">
            {props.title}
        </h1>
        <div className="lg:mt-6 mt-4">
        {props.children}
        </div>
    </div>
}