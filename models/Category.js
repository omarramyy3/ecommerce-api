const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  }
}, { timestamps: true });