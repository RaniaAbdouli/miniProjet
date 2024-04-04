import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {

  users: User[] = [];
  avatarUrlMap: Map<number, string> = new Map();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  this.listUser()
  }

  listUser(){
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.loadAvatars();
        console.log("users", this.users)
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
  loadAvatars(): void {
    for (const user of this.users) {
      if (user.id !== undefined) { 
        this.userService.getUserAvatar(user.id).subscribe(
          (blob: Blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              this.avatarUrlMap.set(user.id!, reader.result as string);
            };
            reader.readAsDataURL(blob);
          },
          (error) => {
            console.error('Error fetching user avatar:', error);
          }
        );
      }
    }
  }
  

}
