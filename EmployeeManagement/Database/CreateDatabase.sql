-- Detect whether the database is Azure SQL Server
DECLARE @Edition NVARCHAR(128);
SET @Edition = CONVERT(NVARCHAR(50), DATABASEPROPERTYEX(DB_NAME(), 'Edition'));

IF @Edition = 'SQL Azure'
BEGIN
    PRINT 'Azure SQL Database detected, skipping database creation.';
END
ELSE
BEGIN
    PRINT 'SQL Server detected, checking for database creation.';
    
    -- Create the database if it does not exist
    IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'EmployeeManagement')
    BEGIN
        CREATE DATABASE EmployeeManagement;
        PRINT 'Database EmployeeManagement created.';
    END
    ELSE
    BEGIN
        PRINT 'Database EmployeeManagement already exists.';
    END
END

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'EmployeeManagement')
BEGIN
    PRINT 'Database EmployeeManagement does not exist. Exiting the script.';
    RETURN; -- Terminates the script
END

-- Switch to the database
USE EmployeeManagement;
GO

-- Create Tables if They Do Not Exist
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Employees')
BEGIN
    CREATE TABLE Employees (
        EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
        FirstName NVARCHAR(50) NOT NULL,
        LastName NVARCHAR(50) NOT NULL,
        Email NVARCHAR(260) NOT NULL,
        DepartmentId INT NOT NULL,
        DateHired DATE NOT NULL,
        Salary DECIMAL(10, 2) NOT NULL,
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
    );
    PRINT 'Table Employees created.';
END
ELSE
BEGIN
    PRINT 'Table Employees already exists.';
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Departments')
BEGIN
    CREATE TABLE Departments (
        DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
        DepartmentName NVARCHAR(100) NOT NULL UNIQUE
    );
    PRINT 'Table Departments created.';
END
ELSE
BEGIN
    PRINT 'Table Departments already exists.';
END

-- Drop Views if They Exist and Create New Ones
IF EXISTS (SELECT * FROM sys.views WHERE name = 'vw_EmployeeDetails')
BEGIN
    DROP VIEW vw_EmployeeDetails;
    PRINT 'View vw_EmployeeDetails dropped.';
END
GO

CREATE VIEW vw_EmployeeDetails AS
SELECT 
    e.EmployeeId,
    e.FirstName + ' ' + e.LastName AS FullName,
    d.DepartmentName,
    e.DateHired,
    e.Salary
FROM Employees e
INNER JOIN Departments d ON e.DepartmentId = d.DepartmentId;
GO
PRINT 'View vw_EmployeeDetails created.';
GO

-- Drop Stored Procedures if They Exist and Create New Ones
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'AddEmployee')
BEGIN
    DROP PROCEDURE AddEmployee;
    PRINT 'Stored Procedure AddEmployee dropped.';
END
GO

CREATE PROCEDURE AddEmployee
    @FirstName NVARCHAR(50),
    @LastName NVARCHAR(50),
    @Email NVARCHAR(260),
    @DepartmentId INT,
    @DateHired DATE,
    @Salary DECIMAL(10, 2)
AS
BEGIN
    INSERT INTO Employees (FirstName, LastName, Email, DepartmentId, DateHired, Salary)
    VALUES (@FirstName, @LastName, @Email, @DepartmentId, @DateHired, @Salary);
    PRINT 'Employee added successfully.';
END;
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GetAllEmployees')
BEGIN
    DROP PROCEDURE GetAllEmployees;
    PRINT 'Stored Procedure GetAllEmployees dropped.';
END
GO

CREATE PROCEDURE GetAllEmployees AS
BEGIN
    SELECT * FROM vw_EmployeeDetails;
    PRINT 'All employees retrieved.';
END;
GO

IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'UpdateEmployeeSalary')
BEGIN
    DROP PROCEDURE UpdateEmployeeSalary;
    PRINT 'Stored Procedure UpdateEmployeeSalary dropped.';
END
GO

CREATE PROCEDURE UpdateEmployeeSalary
    @EmployeeId INT,
    @NewSalary DECIMAL(10, 2)
AS
BEGIN
    UPDATE Employees
    SET Salary = @NewSalary,
        UpdatedAt = GETDATE()
    WHERE EmployeeId = @EmployeeId;
    PRINT 'Employee salary updated successfully.';
END;
GO

-- Create Salary Audit Table if Not Exists
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SalaryAudit')
BEGIN
    CREATE TABLE SalaryAudit (
        AuditId INT IDENTITY(1,1) PRIMARY KEY,
        EmployeeId INT NOT NULL,
        OldSalary DECIMAL(10, 2),
        NewSalary DECIMAL(10, 2),
        ChangeDate DATETIME DEFAULT GETDATE()
    );
    PRINT 'Table SalaryAudit created.';
END
ELSE
BEGIN
    PRINT 'Table SalaryAudit already exists.';
END
GO

-- Drop Trigger if Exists and Create New One
IF EXISTS (SELECT * FROM sys.objects WHERE type = 'TR' AND name = 'trg_SalaryUpdate')
BEGIN
    DROP TRIGGER trg_SalaryUpdate;
    PRINT 'Trigger trg_SalaryUpdate dropped.';
END
GO

CREATE TRIGGER trg_SalaryUpdate
ON Employees
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Salary)
    BEGIN
        INSERT INTO SalaryAudit (EmployeeId, OldSalary, NewSalary)
        SELECT
            i.EmployeeId,
            d.Salary AS OldSalary,
            i.Salary AS NewSalary
        FROM inserted i
        INNER JOIN deleted d ON i.EmployeeId = d.EmployeeId
        WHERE d.Salary != i.Salary; -- Ensure old and new salaries differ
        PRINT 'Salary audit triggered.';
    END;
END;
GO
