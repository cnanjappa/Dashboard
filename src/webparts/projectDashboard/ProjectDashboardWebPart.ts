import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Log, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'ProjectDashboardWebPartStrings';
import ProjectDashboard from './components/ProjectDashboard';
import { IProjectDashboardProps } from './components/IProjectDashboardProps';

export interface IProjectDashboardWebPartProps {
  description: string;
  context:WebPartContext;
}

export default class ProjectDashboardWebPart extends BaseClientSideWebPart<IProjectDashboardWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProjectDashboardProps> = React.createElement(
      ProjectDashboard,
      {
        description: this.properties.description,
        context:this.context
      }
    );

    Log.info("render",this.context.pageContext.web.absoluteUrl);
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
