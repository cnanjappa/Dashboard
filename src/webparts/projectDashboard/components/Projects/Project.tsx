import * as React from 'react';
import {ProjectProps} from './ProjectProps';
import {ProjectState} from './ProjectState';
import{
    DocumentCard,
    DocumentCardDetails,
    DocumentCardTitle
} from "office-ui-fabric-react/lib/DocumentCard";
import {SPHttpClient, 
        SPHttpClientResponse, 
        ISPHttpClientOptions}  from '@microsoft/sp-http';
import { ThemeSettingName } from 'office-ui-fabric-react';
import { Log} from '@microsoft/sp-core-library';

export class Project extends React.Component<ProjectProps,ProjectState>{
    constructor(props:ProjectProps,state:ProjectState){
        super(props);
        this.state={
            items:[],
        };
    }
    public getItems(filterVal){
       if (filterVal==="All") {
            this.props.context.spHttpClient
            .get(
                `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Project')/items?$select=Title,Status,Manager/Title,Manager/EMail&$expand=Manager`,
                SPHttpClient.configurations.v1
            )
            .then(
                (response: SPHttpClientResponse): Promise<{ value: any[] }> => {
                    return response.json();
                }
            )
            .then(
                (response: { value: any[]}) => {
                var _items = [];
                _items = _items.concat(response.value);
                this.setState({
                    items: _items
                });
            });
       }
       else{
            this.props.context.spHttpClient
            .get(
                `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('Project')/items?$select=Title,Status,Manager/Title,Manager/EMail&$expand=Manager&$filter=Status eq %27${filterVal}%27`,
                SPHttpClient.configurations.v1
            )
            .then(
                (response: SPHttpClientResponse): Promise<{ value: any[] }> => {
                    return response.json();
                }
            )
            .then(
                (response: { value: any[]}) => {
                var _items = [];
                _items = _items.concat(response.value);
                this.setState({
                    items: _items
                });
            });
       }
    }
    public componentDidMount(){
        this.getItems("All");
    }
    
    public render(): React.ReactElement<ProjectProps>{
        var _projDocLink = `${this.props.context.pageContext.web.absoluteUrl}/Project%20Documents/Forms/AllItems.aspx?FilterField1=Project&FilterValue1=`;
        return <div> 
            <div><h1>Project Dashboard</h1></div>
            <div>
                <button onClick={()=> this.getItems("All")}>All</button>
                <button onClick={()=> this.getItems("New")}>New</button>
                <button onClick={()=> this.getItems("Ongoing")}>Ongoing</button>
                <button onClick={()=> this.getItems("Complete")}>Complete</button>
                <button onClick={()=> this.getItems("Cancelled")}>Cancelled</button>
            </div>
            <div>
                {this.state.items.map((item,key) => 
                    <DocumentCard>
                        <div><a href={ _projDocLink+ item.Title}><DocumentCardTitle  title={item.Title}></DocumentCardTitle></a></div>
                        <DocumentCardDetails>
                            <div>{item.Status}</div>
                            <div><a href={"mailto:"+item.Manager.EMail}>{item.Manager.Title}</a></div>                       
                        </DocumentCardDetails>
                    </DocumentCard>
                )}
            </div>
        </div>;
    }
}