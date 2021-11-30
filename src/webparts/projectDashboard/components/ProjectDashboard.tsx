import * as React from 'react';
import styles from './ProjectDashboard.module.scss';
import { IProjectDashboardProps } from './IProjectDashboardProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {Project} from './Projects/Project';

export default class ProjectDashboard extends React.Component<IProjectDashboardProps, {}> {
  public render(): React.ReactElement<IProjectDashboardProps> {
    return (
      <div className={ styles.projectDashboard }>
        
        <Project context = {this.props.context}></Project>
      </div>
    );
  }
}
