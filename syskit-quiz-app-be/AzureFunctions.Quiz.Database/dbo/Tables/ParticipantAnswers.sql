CREATE TABLE [dbo].[ParticipantAnswers]
(
	[ParticipantId] INT NOT NULL,
	[QuestionAnswerId] INT NOT NULL,
	CONSTRAINT PK_ParticipantAnswers PRIMARY KEY (ParticipantId, QuestionAnswerId),
	CONSTRAINT [FK_ParticipantAnswers_Participant] FOREIGN KEY ([ParticipantId]) REFERENCES [Participant]([Id]) ON DELETE Cascade,
	CONSTRAINT [FK_ParticipantAnswers_QuestionAnswer] FOREIGN KEY ([QuestionAnswerId]) REFERENCES [QuestionAnswer]([Id])
)
