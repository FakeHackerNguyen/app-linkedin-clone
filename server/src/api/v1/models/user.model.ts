import {Schema, model} from 'mongoose';
import validator from 'validator';
import {IUser} from '../interfaces/feature/auth/user.interface';

const userSchema = new Schema<IUser>({
  provider: {
    type: String,
    required: true,
    default: 'local',
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, 'First name must have more or equal than 2 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'You must have a last name'],
    minlength: [2, 'Last name must have more or equal than 2 characters'],
  },
  fullName: String,
  location: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  headline: String,
  cover: {
    type: Object,
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    default: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1709004468/avatars/default-avatar.png',
      public_id: 'avatars/default-avatar.png',
    },
  },
  avatar: {
    type: Object,
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    default: {
      url: 'https://res.cloudinary.com/myshop-it/image/upload/v1709004468/avatars/default-avatar.png',
      public_id: 'avatars/default-avatar.png',
    },
  },
  //   educations: [
  //     {
  //       school: {
  //         type: Schema.Types.ObjectId,
  //         ref: 'University',
  //       },
  //       fieldOfStudy: String,
  //       degree: String,
  //       grade: Number,
  //       activities: String,
  //       description: String,
  //       skills: [
  //         {
  //           type: String,
  //           trim: true,
  //         },
  //       ],

  //       startEducation: Date,
  //       endEducation: Date,
  //       _id: false, // remove _id from subdocument
  //     },
  //   ],
  //   experiences: [
  //     {
  //       company: {
  //         type: Schema.Types.ObjectId,
  //         ref: 'Company',
  //       },
  //       jobTitle: String,
  //       typeEmployment: String,
  //       description: String,
  //       location: String,
  //       locationType: String,
  //       industry: String,
  //       skills: [
  //         {
  //           type: String,
  //           trim: true,
  //         },
  //       ],
  //       startWork: Date,
  //       endWork: Date,
  //       _id: false, // remove _id from subdocument
  //     },
  //   ],
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    minlength: [8, 'Password must have more or equal than 8 characters'],
    maxLength: [200, 'Password must have less or equal than 200 characters'],
  },
});

export default model<IUser>('User', userSchema);
