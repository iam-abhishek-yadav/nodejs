import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'other'],
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		diagnosedWith: {
			type: String,
			required: true,
		},
		bloodGroup: {
			type: String,
			enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
		},
		admissionDate: {
			type: Date,
			default: Date.now,
		},
		admittedIn: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Hospital',
		},
	},
	{ timestamps: true }
);

export const Patient = mongoose.model('Patient', patientSchema);
