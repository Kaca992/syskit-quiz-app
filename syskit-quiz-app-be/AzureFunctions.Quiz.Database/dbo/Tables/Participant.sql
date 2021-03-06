﻿CREATE TABLE [dbo].[Participant]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(200) NOT NULL,
	[Email] NVARCHAR(200) NOT NULL, 
    [Course] NVARCHAR(50) NOT NULL, 
    [EnrollmentYear] NVARCHAR(20) NOT NULL,
	[Result] DECIMAL(5, 2) NOT NULL DEFAULT 0,
	[SurveyId] INT NOT NULL,
	[CategoryId] INT NULL , 
    CONSTRAINT [FK_Participant_Survey] FOREIGN KEY ([SurveyId]) REFERENCES [Survey]([Id])
)
