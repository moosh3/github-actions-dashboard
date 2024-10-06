package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// JobTelemetry represents data about a Github Job
type JobTelemetry struct {
	Workflow
	Job
	Runner
}

// Workflow represents information about a GitHub workflow
type Workflow struct {
	ID            string `json:"id"`
	actor         string `json:"actor"`
	event         string `json:"event"`
	ref           string `json:"ref"`
	repository    string `json:"repository"`
	repository_id string `json:"repository_id"`
	run_id        string `json:"run_id"`
	name          string `json:"name"`
	ref_type      string `json:"ref_type"`
	sha           string `json:"sha"`
}

// Job represents information about a specific job within a GitHub workflow
type Job struct {
	ID           string `json:"id"`
	run_id       string `json:"run_id"`
	name         string `json:"name"`
	status       string `json:"status"`
	conclusion   string `json:"conclusion"`
	started_at   string `json:"started_at"`
	completed_at string `json:"completed_at"`
}

// Runner represents information about the GitHub Actions runner
type Runner struct {
	ID     string `json:"id"`
	name   string `json:"name"`
	group  string `json:"group"`
	labels string `json:"class"`
}

// createJobTelemetry adds a new JobTelemetry from JSON received in the request body.
func createJobTelemetry(c *gin.Context) {
	var newJobTelemetry JobTelemetry

	if err := c.BindJSON(&newJobTelemetry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Add logic to save the new JobTelemetry (e.g., to a database)
	// For now, we'll just return the created object
	c.JSON(http.StatusCreated, newJobTelemetry)
}

// getJobTelemetries responds with the list of all JobTelemetry entries as JSON.
func getJobTelemetries(c *gin.Context) {
	// TODO: Add logic to retrieve all JobTelemetry entries (e.g., from a database)
	// For now, we'll return a placeholder message
	c.JSON(http.StatusOK, gin.H{"message": "List of all JobTelemetry entries"})
}

// getJobTelemetryByID locates the JobTelemetry whose ID value matches the id
// parameter sent by the client, then returns that JobTelemetry as a response.
func getJobTelemetryByID(c *gin.Context) {
	id := c.Param("id")

	// TODO: Add logic to retrieve the JobTelemetry by ID (e.g., from a database)
	// For now, we'll return a placeholder message
	c.JSON(http.StatusOK, gin.H{"message": "JobTelemetry with ID: " + id})
}

// updateJobTelemetry updates an existing JobTelemetry entry
func updateJobTelemetry(c *gin.Context) {
	id := c.Param("id")
	var updatedJobTelemetry JobTelemetry

	if err := c.BindJSON(&updatedJobTelemetry); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// TODO: Add logic to update the JobTelemetry in the database
	// For now, we'll just return the updated object
	c.JSON(http.StatusOK, gin.H{"message": "Updated JobTelemetry with ID: " + id, "data": updatedJobTelemetry})
}

// deleteJobTelemetry deletes a JobTelemetry entry
func deleteJobTelemetry(c *gin.Context) {
	id := c.Param("id")

	// TODO: Add logic to delete the JobTelemetry from the database
	c.JSON(http.StatusOK, gin.H{"message": "Deleted JobTelemetry with ID: " + id})
}
