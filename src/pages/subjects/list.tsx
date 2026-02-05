import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEPARTMENT_OPTION } from "@/constants";
import { subject } from "@/types";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Subjects } from "react-hook-form";

const SubjectList = () => {
    const [searchQuary, setSearchQuary] = useState('');
    const [selectDepartment, setSelectDepartment] = useState("all");
    const departmentFilter = selectDepartment === 'all'? [] : [
        {field: 'department', operator: 'eq' as const, value: selectDepartment }
    ];
    const searchFilter = searchQuary ? [
        {field: 'name', operator: 'contains' as const, value: searchQuary }]  : []
    ;
    const subjectTable = useTable<subject>(
        {
            columns: useMemo<ColumnDef<subject>[]>(() => [
                {
                    id: 'code', 
                    accessorKey: 'code',
                    size: 100,
                    header: () => <p className="column-title ml-2">Code</p>,
                    cell: ({getValue}) => <Badge>{getValue<string>()}</Badge>
                },
                {
                    id: 'name', 
                    accessorKey: 'name',
                    size: 200,
                    header: () => <p className="column-title ml-2">Name</p>,
                    cell: ({getValue}) => <span className="text-foreground">{getValue<string>()}</span>,
                    filterfn: 'string'
                },
                {
                    id: 'department', 
                    accessorKey: 'department',
                    size: 150,
                    header: () => <p className="column-title ml-2">Department</p>,
                    cell: ({getValue}) => <Badge fontVariant="secondary" >{getValue<string>()}</Badge>
                },
                {
                    id: 'description', 
                    accessorKey: 'deescription',
                    size: 300,
                    header: () => <p className="column-title ml-2">Description</p>,
                    cell: ({getValue}) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
                    filterfn: 'includestring  '
                },

            ], []),
            refineCoreProps: {
                resource: "subjects",
                pagination: {pageSize: 10, mode: 'server'},
                filters: {
                    permanent: [...departmentFilter, ...searchFilter]
                },
                sorters: {
                    initial: [
                        {field: "id", order: "desc"}
                    ]
                }
            }
        }
    );
    return (
        <ListView>
            <Breadcrumb />
             
             <h1 className="page-title">Subject</h1>
             <div className="intro-row">
                <p>Quick acesss to metrics and management tools</p>

                <div className="actions-row">
                    <div className="search-field">
                        <Search className="search-icon" />
                         
                         <Input
                         type="text"
                         placeholder="search by name"
                         className="pl-10 w-full" 
                         value={searchQuary}
                         onChange={(e) => setSearchQuary(e.target.value)}/>
                    </div>

                    <div className="flex w-full sm:w-auto gap-2">
                        <Select 
                        value={selectDepartment}
                        onValueChange={setSelectDepartment}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by department"/>
                            </SelectTrigger>
                            
                            <SelectContent>
                                <SelectItem value="all">
                                    All Department
                                </SelectItem>
                                {DEPARTMENT_OPTION.map((department) => (
                                    <SelectItem 
                                    key={department.value}
                                    value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <CreateButton />

                    </div>

                </div>
             </div>

             <DataTable table={subjectTable}/>
        </ListView>
    )
}
export default SubjectList;