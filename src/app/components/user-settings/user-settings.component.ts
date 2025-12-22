import { CreditCardService } from './../../services/AppServices/credit-card.service';
import { AuthService } from './../../services/AppServices/auth.service';
import { JwtService } from './../../services/AppServices/JWT/jwt.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UserService } from '../../services/AppServices/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.sass'
})
export class UserSettingsComponent implements OnInit {

  private readonly jwtService: JwtService = inject(JwtService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly creditCardService: CreditCardService = inject(CreditCardService);
  private readonly userService: UserService = inject(UserService);

  private readonly router: Router = inject(Router);

  public userModel: any;
  public userCreditCards: any;

  private userId: number | undefined;

  public user: any;

  public addFundsAmount: number = 0;

  ngOnInit(): void {
    const rawToken = localStorage.getItem('jwt_access_token_user') ?? "";

    const decodedToken = this.jwtService.decodeToken(rawToken);

    if (decodedToken && decodedToken.nameid) {
      let userId = Number.parseInt(decodedToken.nameid);
      this.userId = userId;

        this.userService.GetUser(userId).subscribe({
          next: (userServiceResponse) => {
            if (userServiceResponse.isSuccess) {
              this.user = userServiceResponse.data;
              console.log(this.user)
            }
          }
        })

        this.authService.IsUserVerified(userId).subscribe({
          next: (authResponse) => {
            this.userService.GetUser(userId).subscribe({
              next: (userResponse) => {
                if (authResponse.data) {
                  this.userModel = {
                    name: userResponse.data.name,
                    lastName: userResponse.data.lastName,
                    age: userResponse.data.age,
                    email: userResponse.data.email,
                    phoneNumber: userResponse.data.phoneNumber,
                    balance: decodedToken.user_balance,
                    role: decodedToken.role
                  }

                  this.creditCardService.GetUserCreditCards(userId).subscribe({
                    next: (cardServiceResponse) => {
                      if (cardServiceResponse.data) {
                        this.userCreditCards = cardServiceResponse.data;
                      }
                    }
                  })
                }
              }
            })
          }
        })
    }
  }

  addFunds(): void {
    let newUserModel: any = {
      userBalance: this.user.userBalance + this.addFundsAmount,
      userId: this.user.userId,
      name: this.user.name,
      lastName: this.user.lastName,
      age: this.user.age,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      userRoleType: this.userModel.role,
      isVerified: this.user.isVerified
    }

    switch (newUserModel.userRoleType) {
      case 'User':
        newUserModel.userRoleType = 3
        break;
        case 'Admin':
          newUserModel.userRoleType = 2
          break;
          case 'SuperAdmin':
            newUserModel.userRoleType = 1
            break;

      default:
        break;
    }

    this.userService.UpdateUser(newUserModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.userService.GetUser(this.userId!).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.user = response.data;
              }
            }
          })
        }
      }
    });
  }

  removeCard(card: any): void {
    Swal.fire({
      title: "Remove card?",
      text: `You'll be permanently removing ${card.creditCardIssuerName} ${card.creditCardNumber}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove card"
    }).then((result) => {
      if (result.isConfirmed) {
        this.creditCardService.RemoveUserCrediCard(card.creditCardId).subscribe({
          next: (cardServiceResponse) => {
            if (cardServiceResponse.isSuccess) {
              Swal.fire({
                title: "Deleted!",
                text: "Credit card removed",
                icon: "success"
              });

              this.creditCardService.GetUserCreditCards(this.userId!).subscribe({
                next: (cardServiceResponse) => {
                  if (cardServiceResponse.data) {
                    this.userCreditCards = [];
                    this.userCreditCards = cardServiceResponse.data;
                  }
                }
              })
            }
            else {
              Swal.fire({
                title: "Failed",
                text: "Could not remove card",
                icon: "error"
              });
            }
          }
        })
      }
    })
  }

  logOut(): void {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log Out"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("jwt_access_token_user");

        Swal.fire({
          title: "Logged out successfully",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(() => {
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 100);
        })
      }
    });
  }

  public updateUserForm: FormGroup = new FormGroup({
    userId: new FormControl(null),
    name: new FormControl(''),
    lastnName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  updateUser(): void {
    if (this.updateUserForm.valid) {
      const formData = this.updateUserForm.value;

      let updatedUserForm: any = {
        userId: this.userId,
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber
      }

      this.userService.UpdateUser(updatedUserForm).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            Swal.fire({
              title: "User updated",
              icon: "success"
            })
          }
        }
      })
    }
  }
}
