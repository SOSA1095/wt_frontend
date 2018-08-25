import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location } from '@angular/common';
import { CacheService } from 'ng2-cache/src/services/cache.service';
import { CacheStoragesEnum } from 'ng2-cache/src/enums/cache-storages.enum';
import { CoursesService } from '../../services/courses.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  public group;
  public groupID;
  public students = [];
  @ViewChild('assignmentModal') assignmentModal;
  @ViewChild('teamsTable') teamsTable;

  constructor(private _service: GroupsService,
              private route: ActivatedRoute,
              private location: Location,
              private _authService: UsersService,
              private groupsService: GroupsService,
              private _cacheService: CacheService) {

  }

  ngOnInit() {
    this.groupID = this.route.snapshot.params['id'];
    this._authService.checkCredentials();
    this.route.data.forEach((group : any) => {
      this.group = group.any;
      this.students = group.students;
      // console.log("THIS GROUP", this.group);
      var enrollmentText = "";
      this.group.students.forEach(function(element){
        enrollmentText+=element.enrollment+",";
      });
      this.group.enrollmentText = enrollmentText;
    });
  }

  refresh() {
    this.groupsService.getGroup(this.group.id).subscribe(group => {
      if (group) {
        this.group = group;
        var enrollmentText = "";
        this.group.students.forEach(function(element){
          enrollmentText+=element.enrollment+",";
        });
        this.group.enrollmentText = enrollmentText;
        this.teamsTable.renderTable();
      }
    });
  }

  goBack() {
    this.location.back();
  }

  logout() {
    this._authService.logout();
  }

  loadEditForm(assignment) {
    this.assignmentModal.setAssignment(assignment);
  }


}
