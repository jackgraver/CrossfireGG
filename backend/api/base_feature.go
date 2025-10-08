package api

import (
	"cf-apiserver/db/services"
	"strings"

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
    groupName string
}

func (f *BaseFeature[T]) DefineRoutes(router *gin.Engine) {
    group := router.Group(f.groupName) 
    {
        group.GET("/all", func(c *gin.Context) {
            f.getAll(c)
        })
        group.GET("/:id", func(c *gin.Context) {
            f.getByID(c)
        })
    }
}

func (f *BaseFeature[T]) getAll(c *gin.Context) {
    objects, err := services.AllObjects[T](ApplyPagination(1, 20, f.db))
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    label := strings.ReplaceAll(f.groupName, "/", "") + "s"
    c.JSON(200, gin.H{label: objects})
} 

func (f *BaseFeature[T]) getByID(c *gin.Context) {
    id := c.Param("id")
    object, err := services.GetObject[T](ApplyPagination(1, 20, f.db), id)
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    label := strings.ReplaceAll(f.groupName, "/", "")
    c.JSON(200, gin.H{label: object})
}
