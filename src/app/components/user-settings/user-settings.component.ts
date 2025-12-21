import { CreditCardService } from './../../services/AppServices/credit-card.service';
import { AuthService } from './../../services/AppServices/auth.service';
import { JwtService } from './../../services/AppServices/JWT/jwt.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UserService } from '../../services/AppServices/user.service';
import { response } from 'express';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.sass'
})
export class UserSettingsComponent implements OnInit {

  private readonly jwtService: JwtService = inject(JwtService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly creditCardService: CreditCardService = inject(CreditCardService);
  private readonly userService: UserService = inject(UserService);

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
            if (authResponse.data) {
              this.userModel = {
                name: decodedToken.unique_name,
                lastName: decodedToken.last_name,
                age: decodedToken.age,
                email: decodedToken.email,
                phoneNumber: this.jwtService.getClaim(rawToken, "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"),
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
}
