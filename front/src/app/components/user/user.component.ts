import { Component, NgModule } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  message:string=''
  userData: User = {
    username: '',
    email: '',
    avatar:null
  };

  constructor(private userService: UserService , private router:Router) {}

  Creat(): void {
    const formData = new FormData();
    formData.append('username', this.userData.username);
    formData.append('email', this.userData.email);
    if (this.userData.avatar) {
      formData.append('avatar', this.userData.avatar);
    }
  
    this.userService.createUser(formData).subscribe(
      (response: any) => {
        this.message = response.message;
        console.log('Message:', this.message);
        
        this.userData.username = '';
        this.userData.email = '';
        this.userData.avatar = null;

        setTimeout(() => {
          this.router.navigate(['/listUser']);
        }, 1300);

      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
  
  
  

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      this.userData.avatar = files.item(0);
    } else {
      this.userData.avatar = null;
    }
  }

}
