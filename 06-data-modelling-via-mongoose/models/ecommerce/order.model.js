import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		orderItems: [
			{
				qty: { type: Number, required: true },
				price: { type: Number, required: true },
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		status: {
			type: String,
			default: 'Pending',
			enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
		},
	},
	{ timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
