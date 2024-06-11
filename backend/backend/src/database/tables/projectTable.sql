CREATE TABLE Projects (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    Status NVARCHAR(50) DEFAULT 'In Progress',
    AssignedTo INT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (AssignedTo) REFERENCES Users(Id)
);