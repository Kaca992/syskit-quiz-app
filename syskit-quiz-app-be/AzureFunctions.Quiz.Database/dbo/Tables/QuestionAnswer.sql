CREATE TABLE [dbo].[QuestionAnswer]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[QuestionId] INT NOT NULL,
	[AnswerText] NVARCHAR(1000) NOT NULL,
	CONSTRAINT [FK_QuestionAnswer_Question] FOREIGN KEY ([QuestionId]) REFERENCES [Question]([Id]) ON DELETE Cascade
)
