import { Schema, model, models } from 'mongoose';

const SnippetSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
  snippet: {
    type: String,
    required: [true, 'Snippet is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  likes: {
    type: Number
  },
  whoLiked: {
    type: Schema.Types.Array,
    version: Schema.Types.Number
  }
});

const Snippet = models.Snippet || model('Snippet', SnippetSchema);

export default Snippet;