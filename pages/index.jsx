import Head from "next/head";
import Image from "next/legacy/image";
import { getDirectusClient } from "../lib/directus";
import { formatRelativeTime } from "../utils/format-relative-time";
import { Directus } from "@directus/sdk";
import getConfig from "next/config";
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { registerLicense } from '@syncfusion/ej2-base';
import { GanttComponent, Edit, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from '../data';

registerLicense(
  'ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0RiXH1cdHJQT2BVVkw='
);

export default function Home({ projects }) {
  var taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
};
var labelSettings = {
    leftLabel: 'TaskName'
};
var  editOptions = {
  allowEditing: true,
  allowAdding: true,
  mode: 'Dialog'
};

var projectStartDate = new Date('03/24/2019');
var projectEndDate = new Date('07/06/2019');
  return (
    
    
    
    <main className="">
      
        
          <div className="articles-grid">
            {projects.map((project, index) => (
              <div key={index}>
                {project.name} <span>{project.deadline}</span>
              </div>
            ))}
          </div>
          <div className='control-pane p-10'>
        <div className='control-section h-98'>
          <GanttComponent allowRowDragAndDrop='true' id='Default' height={500} dataSource={projectNewData} treeColumnIndex={1} taskFields={taskFields} labelSettings={labelSettings}  projectStartDate={projectStartDate} projectEndDate={projectEndDate}
          editSettings={editOptions}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='id' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              </ColumnsDirective>
            <Inject services={[Edit,Selection]}/>
          </GanttComponent>
        </div>

      </div>
          
        
    </main> 
  );
}

export async function getStaticProps() {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
  const { url } = publicRuntimeConfig;
  const directus = new Directus(url);

  const response = await directus.items("Project").readByQuery({
    fields: ["name", "deadline"],
  });

  const formattedProjects = response.data.map((p) => {
    return {
      ...p,
    };
  });
  const [...projects] = formattedProjects;
  return {
    props: {
      projects,
    },
  };
}
