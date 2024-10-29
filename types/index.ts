/** Represents a user in the system */
export interface User {
    /** Unique identifier for the user */
    id: string;
    /** User's email address */
    email: string;
    /** User's username */
    username: string;
    /** Associated tenant identifier */
    tenantId: string;
}

/** Represents a GitHub repository */
export type Repository = {
    /** Unique identifier for the repository */
    id: string;
    /** Repository name */
    name: string;
    /** Full repository name including owner */
    fullName: string;
    /** Repository description */
    description: string;
    /** Whether the repository is private */
    private: boolean;
    /** Whether the repository is a fork */
    fork: boolean;
    /** Repository creation timestamp */
    createdAt: string;
    /** Last update timestamp */
    updatedAt: string;
    /** Last push timestamp */
    pushedAt: string;
    /** Repository size in KB */
    size: number;
    /** Number of repository stars */
    starCount: number;
    /** Primary programming language */
    language: string;
    /** Whether issues are enabled */
    hasIssues: boolean;
    /** Whether projects are enabled */
    hasProjects: boolean;
    /** Whether wiki is enabled */
    hasWiki: boolean;
    /** Repository owner's ID */
    ownerId: string;
    /** Repository owner details */
    owner: User;
}

/** Represents a Pull Request */
export interface PullRequest {
    /** Unique identifier for the pull request */
    id: string;
    /** Pull request number */
    number: number;
    /** Pull request title */
    title: string;
    /** Current state of the pull request */
    state: string;
}

/** Represents a GitHub Actions Workflow */
export interface Workflow {
    /** Unique identifier for the workflow */
    id: string;
    /** Workflow name */
    name: string;
    /** Path to workflow file */
    path: string;
    /** Current state of the workflow */
    state: string;
    /** Workflow creation timestamp */
    createdAt: string;
    /** Last update timestamp */
    updatedAt: string;
    /** API URL for the workflow */
    url: string;
    /** HTML URL for viewing the workflow */
    htmlURL: string;
    /** URL for the workflow's status badge */
    badgeURL: string;
    /** Associated repository details */
    repository: Repository;
}

/** Represents a GitHub Actions Workflow Run */
export interface WorkflowRun {
    /** Unique identifier for the workflow run */
    id: string;
    /** Workflow name */
    name: string;
    /** Node identifier */
    nodeId: string;
    /** Branch where the workflow was triggered */
    headBranch: string;
    /** Commit SHA that triggered the workflow */
    headSHA: string;
    /** Current status of the workflow run */
    status: string;
    /** Final conclusion of the workflow run */
    conclusion: string;
    /** Type of event that triggered the workflow */
    eventType: string;
    /** Event that triggered the workflow */
    event: string;
    /** API URL for the workflow run */
    url: string;
    /** HTML URL for viewing the workflow run */
    htmlURL: string;
    /** URL for accessing jobs */
    jobsURL: string;
    /** URL for accessing logs */
    logsURL: string;
    /** URL for the check suite */
    checkSuiteURL: string;
    /** URL for accessing artifacts */
    artifactsURL: string;
    /** URL for canceling the workflow run */
    cancelURL: string;
    /** URL for rerunning the workflow */
    rerunURL: string;
    /** URL for the workflow definition */
    workflowURL: string;
    /** Run number for this workflow */
    runNumber: number;
    /** Number of attempts for this run */
    runAttempt: number;
    /** Creation timestamp */
    createdAt: string;
    /** Last update timestamp */
    updatedAt: string;
    /** Timestamp when the run started */
    runStartedAt: string;
    /** Total number of jobs in this run */
    jobsCount: number;
    /** Associated pull requests */
    pullRequests: PullRequest[];
    /** Associated repository details */
    repository: Repository;
}

/** Represents a job within a workflow run */
export interface Job {
    /** Unique identifier for the job */
    id: string;
    /** Job identifier */
    jobId: string;
    /** Associated run identifier */
    runId: string;
    /** URL for the associated run */
    runURL: string;
    /** Node identifier */
    nodeId: string;
    /** Commit SHA that triggered the job */
    headSHA: string;
    /** API URL for the job */
    url: string;
    /** HTML URL for viewing the job */
    htmlURL: string;
    /** URL for accessing logs */
    logsURL: string;
    /** URL for the check run */
    checkRunURL: string;
    /** Job creation timestamp */
    createdAt: string;
    /** Job name */
    name: string;
    /** Job labels */
    labels: string[];
    /** Number of attempts for this job */
    runAttempt: number;
    /** Name of the runner executing the job */
    runnerName: string;
    /** Runner group identifier */
    runnerGroupID: string;
    /** Runner group name */
    runnerGroupName: string;
    /** Associated workflow identifier */
    workflowID: string;
    /** Associated workflow name */
    workflowName: string;
    /** Current status of the job */
    status: string;
    /** Final conclusion of the job */
    conclusion: string;
    /** Timestamp when the job completed */
    completedAt: string;
    /** Steps within the job */
    steps: TaskStep[];
}

/** Represents a step within a job */
export interface TaskStep {
    /** Step name */
    name: string;
    /** Current status of the step */
    status: string;
    /** Final conclusion of the step */
    conclusion: string;
    /** Step number */
    number: number;
    /** Timestamp when the step started */
    startedAt: string;
    /** Timestamp when the step completed */
    completedAt: string;
}

export interface Artifact {
    name: string;
    size: number;
    expired: boolean;
}