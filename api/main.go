package main

import (
	"context"
	"net/http"

	"github.com/google/go-github/v39/github"
	"golang.org/x/oauth2"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Generic CRUD for JobTelemetry
	router.GET("/jobtelemetry", getJobTelemetries)
	router.GET("/jobtelemetry/:id", getJobTelemetryByID)
	router.POST("/jobtelemetry", createJobTelemetry)

	//
	router.GET("/workflow-runs", getWorkflowRuns)

	router.Run("localhost:8080")
}

// Add this function definition
func getWorkflowRuns(c *gin.Context) {
	owner := c.Query("owner")
	repo := c.Query("repo")

	if owner == "" || repo == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing owner or repo parameter"})
		return
	}

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: "YOUR_GITHUB_TOKEN"},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	runs, _, err := client.Actions.ListRepositoryWorkflowRuns(ctx, owner, repo, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	client.Actions.
		c.JSON(http.StatusOK, runs)
}
