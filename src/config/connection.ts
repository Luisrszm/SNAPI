import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/dataSNAPI');

export default mongoose.connection;
