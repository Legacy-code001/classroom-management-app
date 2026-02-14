import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { useBack } from "@refinedev/core";


const SubjectCreate = () => {

    const back = useBack()
        return (
            <CreateView className="class-view">
                <Breadcrumb/>
    
                <h1 className="title-page">Create a Subject</h1>
                <div className="intro-row">
                    <p>provide the required info bellow to add a class</p>
                    <button className="" onClick={() => back()}>Go Back</button>
                </div>
    
    
            </CreateView>
        )
}
export default SubjectCreate;