import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  FormValidators,
  FormValidator,
  TextBox,
} from '@syncfusion/ej2-angular-inputs';
import {
  PopupOpenEventArgs,
  EventRenderedArgs,
  ScheduleComponent,
  MonthService,
  DayService,
  WeekService,
  WorkWeekService,
  EventSettingsModel,
  ResizeService,
  DragAndDropService,
  EJ2Instance,
  ActionEventArgs,
  RenderCellEventArgs,
  AgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { scheduler } from 'src/app/models/Scheduler.model';
import { SchedulerService } from 'src/app/service/scheduler.service';
@Component({
  selector: 'app-scheduler',
  // templateUrl: './scheduler.component.html',
  // styleUrls: ['./scheduler.component.css'],
  providers: [
    MonthService,
    DayService,
    WeekService,
    WorkWeekService,
    ResizeService,
    DragAndDropService,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `<ejs-schedule
    width="100%"
    [views]="views"
    [eventSettings]="eventSettings"
    [showQuickInfo]="showQuickInfo"
    (popupOpen)="onPopupOpen($event)"
    (renderCell)="onRenderCell($event)"
    (actionBegin)="onActionBegin($event)"
  >
    <ng-template #editorTemplate>
      <table class="custom-event-editor" width="100%" cellpadding="5">
        <tbody>
          <tr>
            <td class="e-textlabel">Title</td>
            <td colspan="4">
              <input
                id="title"
                class=" e-field e-input"
                type="text"
                name="subject"
                value=""
                style="width: 100%"
                (keyup)="onChange($event)"
              />
            </td>
          </tr>
          <tr>
            <td class="e-textlabel">Physician</td>
            <td colspan="4">
              <input
                type="text"
                id="eventType"
                class="e-field"
                name="eventType"
                style="width: 100%"
                (change)="onChange($event)"
              />
            </td>
          </tr>
          <tr>
            <td class="e-textlabel">From</td>
            <td colspan="4">
              <input
                id="StartTime"
                class="e-field"
                type="text"
                name="StartTime"
              />
            </td>
          </tr>
          <tr>
            <td class="e-textlabel">To</td>
            <td colspan="4">
              <input id="EndTime" class="e-field" type="text" name="EndTime" />
            </td>
          </tr>
          <tr>
            <td class="e-textlabel">description</td>
            <td colspan="4">
              <textarea
                id="description"
                class="e-field e-input"
                name="description"
                rows="3"
                cols="50"
                style="width: 100%; height: 60px !important; resize: vertical"
                (keyup)="onChange($event)"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </ng-template>
  </ejs-schedule>`,
})
export class SchedulerComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public schedulerService: SchedulerService
  ) {}

  ngOnInit(): void {
    this.loadusers();
    console.log('inside ng on int' + this.listOfScheduledAppointments);
  }

  loadusers() {
    return this.schedulerService
      .getAllListOfAppointments1()
      .subscribe((data: {}) => {
        this.listOfScheduledAppointments = data;
        this.listOfScheduledAppointments.splice(0, 1);
      });
  }
  public validator!: FormValidator;
  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
  public showQuickInfo: Boolean = false;
  private listOfScheduledAppointments: any = [];

  public eventSettings: EventSettingsModel = {
    dataSource: this.listOfScheduledAppointments,
    fields: {
      subject: {
        name: 'subject',
        validation: {required:true},
      },
      description: {
        name: 'description',
        validation: {required:true},
      },
      startTime: {
        name: 'startTime',
        validation: {required:true},
      },
      endTime: {
        name: 'endTime',
        validation: {required:true},
      },
     
     },
  };

  public onPopupOpen(args: PopupOpenEventArgs): void {
    console.log(this.listOfScheduledAppointments);

    if (args.type === 'Editor') {
      let subjectElement: HTMLInputElement = args.element.querySelector(
        '#Subject'
      ) as HTMLInputElement;
      subjectElement = args.element.querySelector(
        '#Subject'
      ) as HTMLInputElement;
      if (subjectElement) {
        subjectElement.value =
          ((<{ [key: string]: Object }>args.data)['Subject'] as string) || '';
      }
      let statusElement: HTMLInputElement = args.element.querySelector(
        '#eventType'
      ) as HTMLInputElement;
      if (!statusElement.classList.contains('e-dropdownlist')) {
        let dropDownListObject: DropDownList = new DropDownList({
          placeholder: 'Choose Physician',
          value: (<{ [key: string]: Object }>args.data)['eventType'] as string,
          dataSource: ['Priyanka', 'Tarun', 'Nandini', 'Rambha', 'Spandana'],
        });
        dropDownListObject.appendTo(statusElement);
      }
      let startElement: HTMLInputElement = args.element.querySelector(
        '#StartTime'
      ) as HTMLInputElement;
      if (!startElement.classList.contains('e-datetimepicker')) {
        startElement.value = (<{ [key: string]: Object }>args.data)[
          'StartTime'
        ] as string;
        new DateTimePicker(
          { value: new Date(startElement.value) || new Date() },
          startElement
        );
      }
      let endElement: HTMLInputElement = args.element.querySelector(
        '#EndTime'
      ) as HTMLInputElement;
      if (!endElement.classList.contains('e-datetimepicker')) {
        endElement.value = (<{ [key: string]: Object }>args.data)[
          'EndTime'
        ] as string;
        new DateTimePicker(
          { value: new Date(endElement.value) || new Date() },
          endElement
        );
      }
      let descriptionElement: HTMLInputElement = args.element.querySelector(
        '#description'
      ) as HTMLInputElement;
      if (descriptionElement) {
        descriptionElement.value =
          ((<{ [key: string]: Object }>args.data)['description'] as string) ||
          '';
      }
      const formElement: HTMLElement = args.element.querySelector(
        '.e-schedule-form'
      ) as HTMLElement;
      this.validator = (formElement as EJ2Instance)
        .ej2_instances[0] as FormValidator;
      this.validator.addRules('eventType', {
        required: [true, 'This field is required.'],
      });
      if (args.target!.classList.contains('e-work-cells')) {
        args.element
          .querySelector('.e-event-save')!
          .classList.add('e-custom-disable');
      }
    }
  }





  dataConvert(sourceData: any) {
    let appointmentId = null;
    appointmentId = sourceData.appointmentId;
    let appointmentSubject = sourceData.subject;
    let appointmentStartTime = sourceData.startTime;
    let appointmentEndTime = sourceData.endTime;
    console.log(sourceData.startTime);

    console.log(sourceData.endTime);

    let appointmentDescription = sourceData.description;
    let appointmentPhysician = sourceData.physicianId;
    let appointmentPatient = sourceData.patientId;
    return new scheduler(
      appointmentSubject,
      appointmentStartTime,
      appointmentEndTime,
      appointmentId,
      appointmentDescription,
      appointmentPatient,
      
    );
  }


  public onChange(args: any) {
    let form = (document.querySelector('.e-schedule-form') as any)
      .ej2_instances[0];
    if (args.element && !args.e) {
      return;
    }
    let names = ['Subject', 'Description', 'eventType'];
    names.forEach((e) => {
      form.validateRules(e);
    });
    let isValidated = false;
    let errorElements = document
      .querySelector('.e-dlg-content')!
      .querySelectorAll('.e-schedule-error');
    for (let i = 0; i < errorElements.length; i++) {
      isValidated =
        (errorElements[i] as any).style.display === 'none' ? true : false;
      if (isValidated === false) {
        break;
      }
    }
    let saveBtn = document.querySelector('.e-custom-disable');
    if (isValidated && saveBtn) {
      saveBtn.classList.remove('e-custom-disable');
    } else if (!isValidated && !saveBtn) {
      document
        .querySelector('.e-event-save')!
        .classList.add('e-custom-disable');
    }
  }

  onActionBegin(args: ActionEventArgs) {
    console.log('Inside on Action begin');
    if (args.requestType === 'eventCreate') {
      console.log('console agrs for on action begin');
      console.log(args);
      console.log(
        'console agrs for on action begin args.addedRecords START TIME DISPLAY'
      );

      const dataTemp = args.addedRecords;

      // this.appService.addAppointment(this.dataConvert(dataTemp));
      // console.log(args.addedRecords![0]['StartTime']);
      // let ob: scheduler = new scheduler();

      // ob.subject = args.addedRecords![0]['subject'];
      // ob.startTime = new Date();
      // ob.endTime = new Date();
      // ob.description = args.addedRecords![0]['description'];
      // ob.physicianName = args.addedRecords![0]['eventType'];

      // console.log('console agrs for on action begin get single value');
      console.log(args.addedRecords);

      this.schedulerService.addPost(this.dataConvert(dataTemp));
    } else if (args.requestType === 'eventRemove') {
      console.log('Inside action remove ');
      args.deletedRecords![0];
      let id = args.deletedRecords![0]['Id'];
      console.log('display id whose elememt needs to be deleted ' + id);
    } else if (args.requestType === 'eventChange') {
      console.log('Inside action change ');
      args.changedRecords![0];
      let id = args.changedRecords![0]['Id'];
      console.log('display id whose elememt needs to be changed ' + id);
    }
    console.log(args);
  }

  onActionCompleted(args: ActionEventArgs) {
    if (args.deletedRecords) {
      args.deletedRecords![0];

      // this.postService.deletePost();
    }
  }

  onRenderCell(args: RenderCellEventArgs): void {
    // Adding "e-disable-date" class to preventing the CRUD actions in the past date and time cells
    if (args.date! < new Date()) {
      args.element.classList.add('e-disable-dates');
    }
  }
}
