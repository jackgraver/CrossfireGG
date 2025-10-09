package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name string `json:"name"`
	Email string `json:"email"`
	Password string
}

type PublicUser struct {
	ID    uint   `json:"id"`
	Email string `json:"email"`
}

func (u *User) Public() PublicUser {
	return PublicUser{
		ID:    u.ID,
		Email: u.Email,
	}
}

type Role struct {
	gorm.Model
	Name string `json:"name"`
}

type UserRole struct {
	gorm.Model
	UserID uint `json:"user_id"`
	User User `json:"user"`
	RoleID uint `json:"role_id"`
	Role Role `json:"role"`
}