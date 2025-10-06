package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name string
	Email string
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
	Name string
}

type UserRole struct {
	gorm.Model
	UserID uint
	User User
	RoleID uint
	Role Role
}