import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {
      type: String,
      required: true,
      maxlength: 11,
      match: [/^\d{1,11}$/, 'Phone must be up to 11 digits'],
    },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true, min: 1 },
    joiningDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);
