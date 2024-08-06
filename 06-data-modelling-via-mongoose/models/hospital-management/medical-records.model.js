import mongoose from 'mongoose';

const medicalRecordsSchema = new mongoose.Schema(
	{
		patient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Patient',
			required: true,
		},
		doctors: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Doctor',
			},
		],
		medicalRecord: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const MedicalRecords = mongoose.model(
	'MedicalRecords',
	medicalRecordsSchema
);
