CREATE TABLE [dbo].[Question]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[QuestionText] NVARCHAR(1000) NOT NULL,
	[CorrectAnswerId] INT NULL,
	[IsEnabled] BIT NOT NULL DEFAULT 1,
	CONSTRAINT [FK_Question_CorrectAnswer] FOREIGN KEY ([CorrectAnswerId]) REFERENCES [QuestionAnswer]([Id])
)
