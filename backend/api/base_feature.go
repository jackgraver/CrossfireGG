package api

import (
	"cf-apiserver/db/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func ApplyPagination(page int, limit int, db *gorm.DB) *gorm.DB {
    if page < 1 {
        page = 1
    }
    if limit < 1 || limit > 100 {
        limit = 20
    }

    offset := (page - 1) * limit
    return db.Offset(offset).Limit(limit)
}

type BaseFeature[T any] struct {
	db *gorm.DB
}

func (f *BaseFeature[T]) DefineRoutes(router *gin.Engine) {
	router.GET("/all", f.getAll)
	router.GET("/:id", f.getByID)
}

func (f *BaseFeature[T]) getAll(c *gin.Context) {
    tournaments, err := services.AllObjects[T](ApplyPagination(1, 20, f.db))
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, gin.H{"tournaments": tournaments})
} 

func (f *BaseFeature[T]) getByID(c *gin.Context) {
    id := c.Param("id")
    tournament, err := services.GetObject[T](ApplyPagination(1, 20, f.db), id)
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, gin.H{"tournament": tournament})
}
