import mongoose from 'mongoose';

const hospitalHoursSchema = new mongoose.Schema({
	day: {
		type: String,
		required: true,
	},
	from: {
		type: String,
		required: true,
	},
	to: {
		type: String,
		required: true,
	},
});

const doctorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		specialization: {
			type: String,
			required: true,
		},
		hospital: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Hospital',
			},
		],
		salary: {
			type: Number,
			required: true,
		},
		qualification: {
			type: String,
			required: true,
		},
		experience: {
			type: Number,
			required: true,
			default: 0,
		},
		hospitalHours: [hospitalHoursSchema],
	},
	{ timestamps: true }
);

export const Doctor = mongoose.model('Doctor', doctorSchema);
